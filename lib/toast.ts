import { toast } from "react-hot-toast"

export function notify(message: string, type: "success" | "error" = "success") {
  if (type === "error") {
    toast.error(message)
  } else {
    toast.success(message)
  }
}
