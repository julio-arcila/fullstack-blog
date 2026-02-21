import { Hono } from "hono";
import { createRequestHandler } from "react-router";
// We dynamically import the build below based on the environment.
import { getCookie, setCookie } from "hono/cookie";
import { sign, verify } from "hono/jwt";
import { drizzle } from "drizzle-orm/d1";
import { eq } from "drizzle-orm";
import { users } from "./app/db/schema";
import { verifyPassword } from "./app/utils/crypto";

import type {
  D1Database,
  R2Bucket,
  KVNamespace,
} from "@cloudflare/workers-types";

// Type definition for Env binding
type Env = {
  DB: D1Database;
  JWT_SECRET: string;
  AI: any;
  MEDIA: R2Bucket;
  CACHE: KVNamespace;
};

type Variables = {
  user: any;
};

const app = new Hono<{ Bindings: Env; Variables: Variables }>();

// Auth Middleware to protect certain routes
app.use("*", async (c, next) => {
  const token = getCookie(c, "auth_token");
  const path = c.req.path;

  // Verify JWT and set user context if token exists
  if (token) {
    try {
      const payload = await verify(
        token,
        c.env.JWT_SECRET || "fallback_secret",
        "HS256",
      );
      c.set("user", payload);
    } catch (e) {
      // Invalid token
    }
  }

  // Protect admin API routes
  if (path.startsWith("/api/admin")) {
    if (!c.get("user")) return c.json({ error: "Unauthorized" }, 401);
  }

  await next();
});

// Login Route
app.post("/api/auth/login", async (c) => {
  const { email, password } = await c.req.json();
  const db = drizzle(c.env.DB);

  const userRecord = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .get();

  if (
    !userRecord ||
    !(await verifyPassword(password, userRecord.passwordHash))
  ) {
    return c.json({ error: "Invalid credentials" }, 401);
  }

  const payload = {
    sub: userRecord.id,
    email: userRecord.email,
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7, // 7 days
  };

  const token = await sign(payload, c.env.JWT_SECRET || "fallback_secret");

  setCookie(c, "auth_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return c.json({
    success: true,
    user: { id: userRecord.id, email: userRecord.email },
  });
});

// AI Generation Route (Protected)
app.post("/api/admin/generate-meta", async (c) => {
  const { content } = await c.req.json();
  if (!content) return c.json({ error: "Content required" }, 400);

  try {
    const aiResponse = await c.env.AI.run("@cf/meta/llama-2-7b-chat-int8", {
      messages: [
        {
          role: "system",
          content:
            "You are an expert SEO copywriter. Generate a concise, engaging 160-character meta description based on the provided text.",
        },
        { role: "user", content },
      ],
    });

    return c.json({ summary: aiResponse.response });
  } catch (err) {
    return c.json({ error: "AI generation failed" }, 500);
  }
});

import { createHonoServer } from "react-router-hono-server/cloudflare";

export default await createHonoServer({
  app,
  getLoadContext: (c, options) => {
    return {
      cloudflare: {
        env: c.env as any,
        ctx: c.executionCtx,
        user: c.get("user"), // Pass user context to Remix Loaders
      },
    };
  },
});
