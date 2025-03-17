"use client";

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils" 
// 假設你有 utils.js 或 utils/index.js 內含 cn() 函式，如沒有就把 cn() 改成 classNames

// 1. 定義按鈕樣式 (cva)
const buttonVariants = cva(
  // 這裡放共同的 class
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:h-6 [&_svg]:w-6",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",

        // 新增 success / warning
        success: "bg-success text-white shadow-sm hover:bg-success/90",
        warning: "bg-warning text-black shadow-sm hover:bg-warning/90",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

// 2. 建立按鈕元件
const Button = React.forwardRef(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,    // 新增 loading Props
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    // 2.1 確認要用哪個元素，若 asChild = true，則使用 Slot
    const Comp = asChild ? Slot : "button"

    // 2.2 如果 loading = true，設定按鈕 disabled
    const isDisabled = loading || disabled

    // 2.3 若需要 spinner，可在這定義
    // 用簡易的 SVG Spinner
    const spinner = (
      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
          fill="none"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v8z"
        />
      </svg>
    )

    return (
      <Comp
        ref={ref}
        disabled={isDisabled}
        className={cn(
          buttonVariants({ variant, size }),
          className
        )}
        {...props}
      >
        {/* 若 loading，顯示 spinner */}
        {loading && spinner}
        {children}
      </Comp>
    )
  }
)

Button.displayName = "Button"

export { Button, buttonVariants }
