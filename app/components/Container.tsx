import * as React from "react";
import { cn } from "~/utils/cn";

export const Container = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("mx-auto w-full max-w-5xl px-4 md:px-8", className)}
      {...props}
    />
  );
});
Container.displayName = "Container";
