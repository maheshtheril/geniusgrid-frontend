"use client";

import { useToast } from "@/components/ui/use-toast";

/**
 * Simple toast helper to show success/error messages
 *
 * Usage:
 *   import { showToast } from "@/lib/toast";
 *   showToast("Lead created successfully");
 *   showToast("Something went wrong", "error");
 */
export function showToast(message: string, type: "success" | "error" = "success") {
  const { toast } = useToast();
  toast({
    description: message,
    variant: type === "error" ? "destructive" : "default",
  });
}
