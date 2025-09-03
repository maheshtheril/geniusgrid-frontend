import { toast } from "react-hot-toast"

export function notify(message: string) {
  toast(message)
}

export function notifyError(message: string) {
  toast.error(message)
}

export function notifySuccess(message: string) {
  toast.success(message)
}
