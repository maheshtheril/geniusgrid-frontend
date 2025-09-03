import { toast } from "react-hot-toast"

/**
 * Generic notify (default = success style)
 */
export function notify(message: string) {
  toast.success(message)
}

/**
 * Explicit error notification
 */
export function notifyError(message: string) {
  toast.error(message)
}

/**
 * Explicit success notification
 */
export function notifySuccess(message: string) {
  toast.success(message)
}
