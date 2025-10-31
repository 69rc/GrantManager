import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

const alertVariants = cva(
  "relative w-full max-w-2xl mx-auto rounded-xl border shadow-xl p-8 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-6 [&>svg]:top-6 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-background to-muted border-primary/30 text-foreground",
        destructive: "bg-gradient-to-r from-destructive/10 to-destructive/5 border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
        success: "bg-gradient-to-r from-emerald-50/70 to-emerald-100/50 border-emerald-300 text-emerald-700 dark:from-emerald-950/20 dark:to-emerald-900/20 dark:border-emerald-700 dark:text-emerald-300",
        warning: "bg-gradient-to-r from-amber-50/70 to-amber-100/50 border-amber-300 text-amber-700 dark:from-amber-950/20 dark:to-amber-900/20 dark:border-amber-700 dark:text-amber-300",
        info: "bg-gradient-to-r from-blue-50/70 to-blue-100/50 border-blue-300 text-blue-700 dark:from-blue-950/20 dark:to-blue-900/20 dark:border-blue-700 dark:text-blue-300",
      },
      size: {
        sm: "p-4",
        default: "p-8",
        lg: "p-10 text-lg",
        xl: "p-12 text-xl max-w-4xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface AlertProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof alertVariants> {
  closable?: boolean;
  onClose?: () => void;
  showIcon?: boolean;
  icon?: React.ReactNode;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant, size, closable = false, onClose, showIcon = false, icon, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          alertVariants({ variant, size }),
          "animate-in slide-in-from-top-4 fade-in-0 zoom-in-90 duration-300",
          className
        )}
        {...props}
      >
        {showIcon && icon && (
          <div className="absolute left-6 top-6 text-2xl">{icon}</div>
        )}
        <div className={cn(closable ? "pr-10" : "")}>
          {children}
        </div>
        {closable && (
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-md p-1 text-foreground/70 transition-opacity hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:pointer-events-none"
          >
            <X className="h-6 w-6" />
          </button>
        )}
      </div>
    );
  }
);
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-3 font-bold text-2xl leading-none tracking-tight", className)}
    {...props}
  />
));
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-lg [&_p]:leading-relaxed [&_p]:my-3", className)}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };
