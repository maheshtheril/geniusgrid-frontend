"use client";

import toast from "react-hot-toast";

export function notifySuccess(message: string) {
  toast.success(message, { position: "top-right" });
}

export function notifyError(message: string) {
  toast.error(message, { position: "top-right" });
}
