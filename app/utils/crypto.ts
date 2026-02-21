export async function hashPassword(
  password: string,
  salt = "dynamic_blog_salt",
): Promise<string> {
  const enc = new TextEncoder();

  // Use PBKDF2 for password hashing via WebCrypto
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveBits", "deriveKey"],
  );

  const key = await crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: enc.encode(salt),
      iterations: 100000,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt", "decrypt"],
  );

  const exported = await crypto.subtle.exportKey("raw", key);
  return Array.from(new Uint8Array(exported))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function verifyPassword(
  password: string,
  hash: string,
  salt = "dynamic_blog_salt",
): Promise<boolean> {
  const newHash = await hashPassword(password, salt);
  return newHash === hash;
}
