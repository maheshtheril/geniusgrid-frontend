"use client";
import { toast } from "@/components/ui/use-toast";

export function notify(message: string, type: "success" | "error" = "success") {
  toast({
    title: type === "success" ? "Success" : "Error",
    description: message,
  });
}
