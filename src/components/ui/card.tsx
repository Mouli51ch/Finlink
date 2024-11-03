// src/components/ui/card.tsx
import * as React from "react"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const cardVariants = cva(
  "rounded-lg shadow-sm transition-all duration-200",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground",
        glass: "bg-white/10 backdrop-blur-md border border-white/20",
        gradient: "bg-gradient-to-br from-blue-600 to-purple-600 text-white",
        dark: "bg-gray-900 text-white",
        outlined: "bg-transparent border-2",
        elevated: "bg-white shadow-xl hover:shadow-2xl",
        neon: "bg-black border border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]",
      },
      hover: {
        none: "",
        lift: "hover:-translate-y-1 hover:shadow-lg",
        glow: "hover:shadow-[0_0_25px_rgba(59,130,246,0.3)]",
        scale: "hover:scale-105",
        border: "hover:border-blue-500",
      },
      size: {
        default: "p-6",
        sm: "p-4",
        lg: "p-8",
        xl: "p-10",
      },
      rounded: {
        default: "rounded-lg",
        none: "rounded-none",
        sm: "rounded-sm",
        lg: "rounded-xl",
        xl: "rounded-2xl",
        full: "rounded-3xl",
      },
    },
    defaultVariants: {
      variant: "default",
      hover: "none",
      size: "default",
      rounded: "default",
    },
  }
)

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  asChild?: boolean
  loading?: boolean
  noPadding?: boolean
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ 
    className, 
    variant, 
    hover,
    size,
    rounded,
    loading,
    noPadding,
    children,
    ...props 
  }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          cardVariants({ 
            variant, 
            hover,
            size: noPadding ? undefined : size,
            rounded,
          }),
          loading && "animate-pulse",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight", className)}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center pt-4", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
}

// Example usage:
/*
import { 
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter 
} from "@/components/ui/card"

// Default Card
<Card>
  <CardHeader>
    <CardTitle>Default Card</CardTitle>
    <CardDescription>This is a default card example</CardDescription>
  </CardHeader>
  <CardContent>
    Content goes here
  </CardContent>
  <CardFooter>
    Footer content
  </CardFooter>
</Card>

// Glass Effect Card
<Card variant="glass" hover="lift">
  <CardHeader>
    <CardTitle className="text-white">Glass Card</CardTitle>
    <CardDescription className="text-white/70">With hover lift effect</CardDescription>
  </CardHeader>
  <CardContent>
    Content with glass effect
  </CardContent>
</Card>

// Gradient Card
<Card 
  variant="gradient" 
  hover="scale"
  rounded="xl"
>
  Content with gradient background
</Card>

// Neon Card
<Card 
  variant="neon" 
  hover="glow"
  className="text-blue-400"
>
  Neon effect card
</Card>

// Loading State
<Card loading>
  Loading content...
</Card>
*/