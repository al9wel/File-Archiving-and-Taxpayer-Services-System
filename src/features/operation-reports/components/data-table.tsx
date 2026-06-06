"use client"

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
import { Search, ChevronRight, ChevronLeft, ChevronsRight, ChevronsLeft } from "lucide-react"
import type { OperationReport } from "@/types/OperationReport"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function DataTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [operationSearch, setOperationSearch] = React.useState("")
    const [userNameSearch, setUserNameSearch] = React.useState("")

    const filteredData = React.useMemo(() => {
        return (data as OperationReport[]).filter((report) => {
            const operation = report.action?.toLowerCase() || ""
            const userName = `${report.user?.name || ""} ${report.user?.first_name || ""} ${report.user?.last_name || ""}`.toLowerCase()

            return (
                operation.includes(operationSearch.toLowerCase()) &&
                userName.includes(userNameSearch.toLowerCase())
            )
        }) as TData[]
    }, [data, operationSearch, userNameSearch])

    const table = useReactTable({
        data: filteredData,
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
                pageSize: 5,
            },
        },
    })

    return (
        <div className="space-y-4" dir="rtl">
            <div className="bg-card p-4 rounded-2xl border border-border shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-muted-foreground">البحث باسم العملية</label>
                        <div className="relative">
                            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="اسم العملية"
                                value={operationSearch}
                                onChange={(event) => setOperationSearch(event.target.value)}
                                className="h-11 pr-10 rounded-xl bg-muted/30 border-muted-foreground/10"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-muted-foreground">البحث باسم المستخدم</label>
                        <div className="relative">
                            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="اسم المستخدم"
                                value={userNameSearch}
                                onChange={(event) => setUserNameSearch(event.target.value)}
                                className="h-11 pr-10 rounded-xl bg-muted/30 border-muted-foreground/10"
                            />
                        </div>
                    </div>
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
                        {table.getRowModel().rows?.length ? (
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
                                    لا توجد بيانات تطابق بحثك...
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center justify-between px-2 py-2">
                <div className="text-sm text-muted-foreground font-medium">
                    صفحة {table.getState().pagination.pageIndex + 1} من {table.getPageCount()}
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
