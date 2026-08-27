import * as React from "react"
import {
    type ColumnDef,
    type ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, ChevronRight, ChevronLeft, ChevronsRight, ChevronsLeft, Plus, Loader2 } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { NavLink } from "react-router-dom"
import { ROUTES } from "@/constants/routes"
import { usePermission } from "@/hooks/usePermission"
import { ACTIONS } from "@/constants/permissions"
import { useActivityTypes } from "@/features/basic-info/hooks/activity-types/useActivityTypes"
import { useFileStatuses } from "@/features/basic-info/hooks/file-status/useFileStatuses"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    searchValue?: string
    onSearchChange?: (val: string) => void
    isLoading?: boolean
}

export function DataTable<TData, TValue>({
    columns,
    data,
    searchValue = "",
    onSearchChange,
    isLoading = false,
}: DataTableProps<TData, TValue>) {
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const canCreate = usePermission(ACTIONS.CREATE_FILE)
    const { data: activityTypes } = useActivityTypes()
    const { data: fileStatuses } = useFileStatuses()

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            columnFilters,
        },
        initialState: {
            pagination: {
                pageSize: 10,
            },
        },
    })

    return (
        <div className="space-y-4" dir="rtl">
            {/* Filters Header */}
            <div className="bg-card p-4 rounded-2xl border border-border shadow-sm">
                <div className="grid grid-cols-1 xl:grid-cols-[2fr_1fr_1fr_auto] gap-3 items-end">
                    {/* Server-Side Search Input */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-muted-foreground">البحث بالاسم / اسم المستخدم</label>
                        <div className="relative">
                            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="ابحث بالاسم الأول، الأخير، أو اسم المستخدم..."
                                value={searchValue}
                                onChange={(event) => onSearchChange?.(event.target.value)}
                                className="h-11 pr-10 rounded-xl bg-muted/30 border-muted-foreground/10"
                            />
                        </div>
                    </div>

                    {/* Activity Type Filter */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-muted-foreground">نوع النشاط</label>
                        <Select
                            value={(table.getColumn("activityType")?.getFilterValue() as string) || "all"}
                            onValueChange={(value) => table.getColumn("activityType")?.setFilterValue(value === "all" ? "" : value)}
                        >
                            <SelectTrigger style={{ height: "2.75rem" }} className="h-11 w-full rounded-xl bg-muted/30 border-muted-foreground/10">
                                <SelectValue placeholder="الكل" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">الكل</SelectItem>
                                {activityTypes?.data?.map((type) => (
                                    <SelectItem key={type.id} value={type.name}>
                                        {type.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* File Status Filter */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-muted-foreground">حالة الملف</label>
                        <Select
                            value={(table.getColumn("fileStatus_statusName")?.getFilterValue() as string) || "all"}
                            onValueChange={(value) => table.getColumn("fileStatus_statusName")?.setFilterValue(value === "all" ? "" : value)}
                        >
                            <SelectTrigger style={{ height: "2.75rem" }} className="h-11 w-full rounded-xl bg-muted/30 border-muted-foreground/10">
                                <SelectValue placeholder="الكل" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">الكل</SelectItem>
                                {fileStatuses?.data?.map((status) => (
                                    <SelectItem key={status.id} value={status.statusName}>
                                        {status.statusName}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Add Button */}
                    {canCreate && (
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-muted-foreground opacity-0 hidden xl:block">إضافة</label>
                            <NavLink to={ROUTES.DASHBOARD.FILES_CREATE}>
                                <Button className="h-11 px-6 w-full xl:w-fit rounded-xl bg-primary hover:bg-primary-hover text-primary-foreground shadow-lg shadow-primary/20 cursor-pointer flex items-center justify-center gap-2 transition-all active:scale-95 whitespace-nowrap font-bold">
                                    <Plus className="h-4 w-4" />
                                    <span>إضافة ملف</span>
                                </Button>
                            </NavLink>
                        </div>
                    )}
                </div>
            </div>

            {/* Table Area Section */}
            <div className="overflow-hidden rounded-2xl border shadow-sm bg-card">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow className="bg-primary/95 hover:bg-primary border-none" key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead className="text-primary-foreground font-bold h-12 text-center" key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-32 text-center">
                                    <div className="flex items-center justify-center gap-2 text-muted-foreground">
                                        <Loader2 className="h-5 w-5 animate-spin text-primary" />
                                        <span>جاري تحميل الملفات...</span>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    className="hover:bg-muted/50 border-muted/20 transition-colors"
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell className="text-center py-3 px-4 font-medium" key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-32 text-center text-muted-foreground italic">
                                    لا توجد ملفات مسجلة تطابق معايير البحث...
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center justify-between px-2 py-2">
                <div className="text-sm text-muted-foreground font-medium">
                    صفحة {table.getState().pagination.pageIndex + 1} من {Math.max(1, table.getPageCount())}
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="icon"
                        className="hidden h-9 w-9 lg:flex rounded-lg cursor-pointer"
                        onClick={() => table.setPageIndex(0)}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <ChevronsRight className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-9 w-9 rounded-lg border-muted-foreground/20 cursor-pointer"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>

                    <div className="flex items-center gap-1 mx-2">
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">
                            {table.getState().pagination.pageIndex + 1}
                        </span>
                    </div>

                    <Button
                        variant="outline"
                        size="icon"
                        className="h-9 w-9 rounded-lg border-muted-foreground/20 cursor-pointer"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        className="hidden h-9 w-9 lg:flex rounded-lg cursor-pointer"
                        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                        disabled={!table.getCanNextPage()}
                    >
                        <ChevronsLeft className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    )
}
