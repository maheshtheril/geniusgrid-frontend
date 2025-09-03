import { toast } from "react-hot-toast"

export function notify(message: string, type: "success" | "error" = "success") {
  if (type === "error") {
    toast.error(message)
  } else {
    toast.success(message)
  }
}

export function notifyError(message: string) {
  toast.error(message)
}

export function notifySuccess(message: string) {
  toast.success(message)
}
