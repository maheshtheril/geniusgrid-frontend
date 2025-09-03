import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Utility function for conditional Tailwind classNames.
 * Shadcn UI components depend on this.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
