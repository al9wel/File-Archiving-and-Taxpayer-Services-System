import type { ReactNode } from "react"
import type { LucideIcon } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type ChartPanelProps = {
  title: string
  description: string
  sectionLabel: string
  icon: LucideIcon
  children: ReactNode
  footer?: ReactNode
  className?: string
}

const ChartPanel = ({
  title,
  description,
  sectionLabel,
  icon: Icon,
  children,
  footer,
  className,
}: ChartPanelProps) => {
  return (
    <Card className={className}>
      <CardHeader className="border-b">
        <div className="flex items-center justify-between gap-3">
          <div className="text-right">
            <CardTitle className="text-xl font-bold text-foreground/90">{title}</CardTitle>
            <CardDescription className="mt-1">{description}</CardDescription>
          </div>
          <div className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
            <span>{sectionLabel}</span>
            <Icon className="size-4" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        {children}
        {footer ? <div className="mt-4 text-center text-sm text-muted-foreground">{footer}</div> : null}
      </CardContent>
    </Card>
  )
}

export default ChartPanel
