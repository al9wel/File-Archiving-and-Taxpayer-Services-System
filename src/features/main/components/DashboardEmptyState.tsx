type DashboardEmptyStateProps = {
  message?: string
}

const DashboardEmptyState = ({ message = "لا توجد بيانات متاحة" }: DashboardEmptyStateProps) => {
  return (
    <div className="flex min-h-48 w-full items-center justify-center rounded-lg border border-dashed text-sm text-muted-foreground">
      {message}
    </div>
  )
}

export default DashboardEmptyState
