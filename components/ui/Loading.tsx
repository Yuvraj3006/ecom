import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

const loadingVariants = cva(
  "animate-spin",
  {
    variants: {
      variant: {
        default: "text-primary",
        secondary: "text-neutral-gray",
        white: "text-white",
        neon: "text-primary animate-pulse-glow",
        cyberpunk: "text-primary animate-glow",
      },
      size: {
        sm: "h-4 w-4",
        default: "h-6 w-6",
        lg: "h-8 w-8",
        xl: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface LoadingProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof loadingVariants> {
  text?: string
  fullScreen?: boolean
}

const Loading = React.forwardRef<HTMLDivElement, LoadingProps>(
  ({ className, variant, size, text, fullScreen, ...props }, ref) => {
    const content = (
      <div className="flex flex-col items-center justify-center gap-2">
        <Loader2 className={cn(loadingVariants({ variant, size }))} />
        {text && (
          <p className="text-sm text-neutral-gray animate-pulse">{text}</p>
        )}
      </div>
    )

    if (fullScreen) {
      return (
        <div
          ref={ref}
          className={cn(
            "fixed inset-0 z-modal bg-black/50 backdrop-blur-sm flex items-center justify-center",
            className
          )}
          {...props}
        >
          {content}
        </div>
      )
    }

    return (
      <div
        ref={ref}
        className={cn("flex items-center justify-center p-4", className)}
        {...props}
      >
        {content}
      </div>
    )
  }
)
Loading.displayName = "Loading"

// Skeleton loader component
const Skeleton = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: "default" | "cyberpunk"
  }
>(({ className, variant = "default", ...props }, ref) => {
  const skeletonClasses = {
    default: "skeleton",
    cyberpunk: "skeleton-cyberpunk",
  }

  return (
    <div
      ref={ref}
      className={cn(skeletonClasses[variant], className)}
      {...props}
    />
  )
})
Skeleton.displayName = "Skeleton"

// Dots loading animation
const DotsLoading = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: "default" | "neon"
  }
>(({ className, variant = "default", ...props }, ref) => {
  const dotClass = variant === "neon" 
    ? "w-2 h-2 bg-primary rounded-full animate-pulse shadow-neon-glow"
    : "w-2 h-2 bg-primary rounded-full animate-pulse"

  return (
    <div
      ref={ref}
      className={cn("flex items-center space-x-1", className)}
      {...props}
    >
      <div className={cn(dotClass)} style={{ animationDelay: "0ms" }} />
      <div className={cn(dotClass)} style={{ animationDelay: "150ms" }} />
      <div className={cn(dotClass)} style={{ animationDelay: "300ms" }} />
    </div>
  )
})
DotsLoading.displayName = "DotsLoading"

// Progress bar loading
const ProgressLoading = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    progress?: number
    variant?: "default" | "neon" | "cyberpunk"
  }
>(({ className, progress = 0, variant = "default", ...props }, ref) => {
  const barClasses = {
    default: "bg-gradient-primary",
    neon: "bg-gradient-primary shadow-neon-glow",
    cyberpunk: "bg-gradient-primary animate-shimmer",
  }

  return (
    <div
      ref={ref}
      className={cn("w-full bg-gray-200 rounded-full h-2", className)}
      {...props}
    >
      <div
        className={cn(
          "h-2 rounded-full transition-all duration-300 ease-out",
          barClasses[variant]
        )}
        style={{ width: `${progress}%` }}
      />
    </div>
  )
})
ProgressLoading.displayName = "ProgressLoading"

export { Loading, Skeleton, DotsLoading, ProgressLoading, loadingVariants }