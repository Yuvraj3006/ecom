import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-button text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50 disabled:hover:scale-100 disabled:hover:shadow-none",
  {
    variants: {
      variant: {
        default: "bg-gradient-primary text-white hover:shadow-neon-glow hover:scale-105 active:scale-95",
        secondary: "bg-white text-primary border-2 border-primary hover:bg-primary hover:text-white hover:shadow-neon-glow active:scale-95",
        outline: "border-2 border-primary text-primary hover:bg-primary hover:text-white active:scale-95",
        ghost: "text-primary hover:bg-primary/10 active:scale-95",
        neon: "bg-gradient-primary text-white shadow-neon-glow hover:shadow-neon-glow-strong hover:scale-105 active:scale-95",
        glass: "glassmorphic text-primary hover:bg-primary hover:text-white hover:shadow-neon-glow active:scale-95",
        cyberpunk: "card-cyberpunk text-primary hover:text-white hover:bg-gradient-primary hover:shadow-neon-glow active:scale-95",
        destructive: "bg-error text-white hover:bg-error/90 hover:shadow-[0_0_12px_rgba(239,68,68,0.5)] active:scale-95",
        success: "bg-success text-white hover:bg-success/90 hover:shadow-[0_0_12px_rgba(16,185,129,0.5)] active:scale-95",
        warning: "bg-warning text-white hover:bg-warning/90 hover:shadow-[0_0_12px_rgba(245,158,11,0.5)] active:scale-95",
        link: "text-primary underline-offset-4 hover:underline hover:text-primary/80",
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-9 px-4 text-xs",
        lg: "h-14 px-8 text-lg",
        xl: "h-16 px-12 text-xl",
        icon: "h-10 w-10",
        "icon-sm": "h-8 w-8",
        "icon-lg": "h-12 w-12",
      },
      loading: {
        false: "",
        true: "cursor-not-allowed opacity-70",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      loading: false,
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  isLoading?: boolean
  loadingText?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    loading, 
    isLoading, 
    loadingText, 
    leftIcon, 
    rightIcon, 
    children, 
    asChild = false, 
    disabled,
    ...props 
  }, ref) => {
    const Comp = asChild ? Slot : "button"
    const isButtonLoading = loading || isLoading
    
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, loading: isButtonLoading, className }))}
        ref={ref}
        disabled={disabled || isButtonLoading}
        {...props}
      >
        {isButtonLoading ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2" />
            {loadingText || children}
          </>
        ) : (
          <>
            {leftIcon && <span className="mr-2">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="ml-2">{rightIcon}</span>}
          </>
        )}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
