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

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function DataTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])

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
                pageSize: 5,
            },
        },
    })

    return (
        <div className="space-y-4" dir="rtl">
            {/* Table Header: Search */}
            <div className="flex items-center justify-between gap-4 py-1">
                <div className="flex-1 relative w-full max-w-md">
                    <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="البحث عن طريق اسم العملية..."
                        value={(table.getColumn("action")?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn("action")?.setFilterValue(event.target.value)
                        }
                        className="h-12 pr-11 bg-muted/80 dark:bg-muted/20 border-2 border-muted-foreground/20 rounded-2xl focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all shadow-sm placeholder:text-muted-foreground/70"
                    />
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
                                        <TableHead className="text-white font-bold h-12 text-center" key={header.id}>
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
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white font-bold text-sm">
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
