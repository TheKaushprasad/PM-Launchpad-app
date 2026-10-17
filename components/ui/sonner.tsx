// lucide-react 0.294 uses the older icon names (CheckCircle2, XOctagon, AlertTriangle).
"use client"

import {
  CheckCircle2Icon,
  InfoIcon,
  Loader2Icon,
  XOctagonIcon,
  AlertTriangleIcon,
} from "lucide-react"
import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      // The app has no dark mode yet.
      theme="light"
      className="toaster group"
      icons={{
        success: <CheckCircle2Icon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <AlertTriangleIcon className="size-4" />,
        error: <XOctagonIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
