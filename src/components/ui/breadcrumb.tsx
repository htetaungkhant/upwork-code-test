import * as React from "react"
import { ChevronRight } from "lucide-react"
import { cn } from "@/utils/styles"

function Breadcrumb({
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      aria-label="breadcrumb"
      className={cn("[&>ol]:flex [&>ol]:items-center [&>ol]:gap-1.5")}
      {...props}
    />
  )
}

interface BreadcrumbListProps extends React.OlHTMLAttributes<HTMLOListElement> {}

const BreadcrumbList = React.forwardRef<HTMLOListElement, BreadcrumbListProps>(
  ({ className, ...props }, ref) => (
    <ol
      ref={ref}
      className={cn(
        "flex items-center gap-1.5 text-muted-foreground text-sm",
        className
      )}
      {...props}
    />
  )
)
BreadcrumbList.displayName = "BreadcrumbList"

interface BreadcrumbItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  asChild?: boolean
}

const BreadcrumbItem = React.forwardRef<HTMLLIElement, BreadcrumbItemProps>(
  ({ asChild, className, ...props }, ref) => {
    const Comp = asChild ? 'span' : 'li'
    return (
      <Comp
        ref={ref}
        className={cn("inline-flex items-center gap-1.5", className)}
        {...props}
      />
    )
  }
)
BreadcrumbItem.displayName = "BreadcrumbItem"

function BreadcrumbSeparator({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      role="presentation"
      aria-hidden="true"
      className={cn("[&>svg]:size-3.5 text-muted-foreground/40", className)}
      {...props}
    >
      {children || <ChevronRight />}
    </span>
  )
}
BreadcrumbSeparator.displayName = "BreadcrumbSeparator"

interface BreadcrumbLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  asChild?: boolean
  current?: boolean
}

const BreadcrumbLink = React.forwardRef<HTMLAnchorElement, BreadcrumbLinkProps>(
  ({ asChild, className, current, ...props }, ref) => {
    const Comp = asChild ? 'span' : 'a'
    return (
      <Comp
        ref={ref}
        className={cn(
          "transition-colors hover:text-foreground",
          current && "text-foreground pointer-events-none font-medium",
          className
        )}
        aria-current={current ? "page" : undefined}
        {...props}
      />
    )
  }
)
BreadcrumbLink.displayName = "BreadcrumbLink"

interface BreadcrumbPageProps extends React.HTMLAttributes<HTMLSpanElement> {
  asChild?: boolean
}

const BreadcrumbPage = React.forwardRef<HTMLSpanElement, BreadcrumbPageProps>(
  ({ asChild, className, ...props }, ref) => {
    const Comp = asChild ? 'span' : 'span'
    return (
      <Comp
        ref={ref}
        role="link"
        aria-disabled="true"
        aria-current="page"
        className={cn("text-foreground font-medium pointer-events-none", className)}
        {...props}
      />
    )
  }
)
BreadcrumbPage.displayName = "BreadcrumbPage"

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
}
