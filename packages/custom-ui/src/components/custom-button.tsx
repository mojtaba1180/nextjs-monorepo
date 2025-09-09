import * as React from "react"
import { Button } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"

export interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "sm" | "md" | "lg"
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
}

const CustomButton = React.forwardRef<HTMLButtonElement, CustomButtonProps>(
  ({ className, size = "md", variant = "default", ...props }, ref) => {
    return (
      <Button
        className={cn(
          // Custom styles based on size
          size === "sm" && "h-8 px-3 text-xs",
          size === "md" && "h-10 px-4 py-2",
          size === "lg" && "h-12 px-6 text-lg",
          // Custom styling
          "font-medium transition-all duration-200 hover:scale-105",
          className
        )}
        size={size === "sm" ? "sm" : size === "lg" ? "lg" : "default"}
        variant={variant}
        ref={ref}
        {...props}
      />
    )
  }
)
CustomButton.displayName = "CustomButton"

export { CustomButton }
