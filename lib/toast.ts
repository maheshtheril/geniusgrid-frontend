import { toast } from "react-hot-toast"

// Flexible notify (supports 1 or 2 args)
export function notify(message: string, type: "success" | "error" = "success") {
  if (type === "error") {
    toast.error(message)
  } else {
    toast.success(message)
  }
}

// Explicit helpers for pages still importing them
export function notifyError(message: string) {
  toast.error(message)
}

export function notifySuccess(message: string) {
  toast.success(message)
}
