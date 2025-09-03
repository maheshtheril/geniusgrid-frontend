import { toast } from "react-hot-toast"

/**
 * Generic notify — takes 1 or 2 arguments.
 * notify("Saved!") -> success
 * notify("Failed!", "error") -> error
 */
export function notify(message: string, type: "success" | "error" = "success") {
  if (type === "error") {
    toast.error(message)
  } else {
    toast.success(message)
  }
}

// Explicit helpers for pages that still import these
export function notifyError(message: string) {
  toast.error(message)
}

export function notifySuccess(message: string) {
  toast.success(message)
}
