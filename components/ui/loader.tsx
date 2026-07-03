import { cn } from "@/lib/utils"

export interface LoaderProps extends React.ComponentPropsWithoutRef<"div"> {
  size?: "sm" | "md" | "lg"
}

export function Loader({ className, size = "md", style, ...props }: LoaderProps) {
  const sizeStyles = {
    sm: { "--loader-size": "16px", "--loader-border": "2px" } as React.CSSProperties,
    md: { "--loader-size": "32px", "--loader-border": "3px" } as React.CSSProperties,
    lg: { "--loader-size": "50px", "--loader-border": "4px" } as React.CSSProperties,
  }

  return (
    <div 
      className={cn("loader shrink-0", className)} 
      style={{
        ...sizeStyles[size],
        ...style,
      }}
      {...props}
    />
  )
}
