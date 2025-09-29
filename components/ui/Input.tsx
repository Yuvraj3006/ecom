import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const inputVariants = cva(
  "flex w-full transition-all duration-300 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-gray focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "input-field",
        cyberpunk: "input-cyberpunk",
        neon: "input-neon",
        outline: "border-2 border-primary/20 rounded-input px-4 py-3 bg-white/80 backdrop-blur-sm focus:border-primary focus:shadow-neon-glow",
        ghost: "border-0 bg-transparent px-4 py-3 focus:bg-white/10 focus:backdrop-blur-sm rounded-input",
        underline: "border-0 border-b-2 border-primary/20 rounded-none px-2 py-3 bg-transparent focus:border-primary",
      },
      size: {
        sm: "h-9 px-3 text-xs",
        default: "h-12 px-4 text-sm",
        lg: "h-14 px-6 text-base",
      },
      state: {
        default: "",
        error: "border-error focus:border-error focus:ring-error",
        success: "border-success focus:border-success focus:ring-success",
        warning: "border-warning focus:border-warning focus:ring-warning",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      state: "default",
    },
  }
)

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
  label?: string
  description?: string
  error?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, size, state, startIcon, endIcon, label, description, error, type, ...props }, ref) => {
    const inputState = error ? "error" : state

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-neutral-dark mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          {startIcon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-gray pointer-events-none">
              {startIcon}
            </div>
          )}
          <input
            type={type}
            className={cn(
              inputVariants({ variant, size, state: inputState }),
              startIcon && "pl-10",
              endIcon && "pr-10",
              className
            )}
            ref={ref}
            {...props}
          />
          {endIcon && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-gray pointer-events-none">
              {endIcon}
            </div>
          )}
        </div>
        {description && !error && (
          <p className="mt-2 text-xs text-neutral-gray">{description}</p>
        )}
        {error && (
          <p className="mt-2 text-xs text-error">{error}</p>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input, inputVariants }