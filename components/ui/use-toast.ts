"use client";
import { createContext, useContext } from "react";

const ToastContext = createContext<{ toast: (msg: any) => void }>({ toast: () => {} });

export function useToast() {
  return useContext(ToastContext);
}
