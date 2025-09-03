import { toast } from "react-hot-toast"

// Flexible notify. (1 or 2 args)
export function notify(message: string, type: "success" | "error" = "success") {
  if (type === "error") {
    toast.error(message)
  } else {
    toast.success(message)
  }
}

// For legacy imports
export function notifyError(message: string) {
  toast.error(message)
}

export function notifySuccess(message: string) {
  toast.success(message)
}
