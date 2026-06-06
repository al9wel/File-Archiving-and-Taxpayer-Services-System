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
import { Search, ChevronRight, ChevronLeft, ChevronsRight, ChevronsLeft, Plus } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { NavLink } from "react-router-dom"
import { ROUTES } from "@/constants/routes"
import { usePermission } from "@/hooks/usePermission"
import { ACTIONS } from "@/constants/permissions"
import { useTaxCollectors } from "@/features/tax-collectors/hooks/tax-collectors/useTaxCollectors"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function DataTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const canCreate = usePermission(ACTIONS.CREATE_FILE_MOVEMENT);
    const { data: taxCollectors } = useTaxCollectors()

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
            <div className="bg-card p-4 rounded-2xl border border-border shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_360px_auto] gap-2 items-end">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-muted-foreground">البحث بالاسم التجاري</label>
                        <div className="relative">
                            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="الاسم التجاري"
                                value={(table.getColumn("tradeName")?.getFilterValue() as string) ?? ""}
                                onChange={(event) => table.getColumn("tradeName")?.setFilterValue(event.target.value)}
                                className="h-11 pr-10 rounded-xl bg-muted/30 border-muted-foreground/10"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-muted-foreground">المأمور</label>
                        <Select value={(table.getColumn("taxCollector")?.getFilterValue() as string) || "all"} onValueChange={(value) => table.getColumn("taxCollector")?.setFilterValue(value === "all" ? "" : value)}>
                            <SelectTrigger style={{ height: "2.75rem" }} className="h-11 w-full rounded-xl bg-muted/30 border-muted-foreground/10">
                                <SelectValue placeholder="الكل" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">الكل</SelectItem>
                                {taxCollectors?.data?.map((collector) => (
                                    <SelectItem key={collector.id} value={collector.id.toString()}>
                                        {collector.fullName}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-muted-foreground">حالة الملف</label>
                        <div className="grid grid-cols-4 rounded-xl bg-muted/30 p-1 h-11">
                            {[
                                { value: "", label: "الكل" },
                                { value: "InsideArchive", label: "داخل" },
                                { value: "OutsideArchive", label: "خارج" },
                                { value: "Missing", label: "مفقود" },
                            ].map((option) => (
                                <button
                                    key={option.label}
                                    type="button"
                                    onClick={() => table.getColumn("status")?.setFilterValue(option.value)}
                                    className={`rounded-lg px-2 text-xs font-bold transition-colors cursor-pointer ${((table.getColumn("status")?.getFilterValue() as string) ?? "") === option.value
                                        ? "bg-primary text-primary-foreground shadow-sm"
                                        : "text-muted-foreground hover:text-foreground"
                                        }`}
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>
                    </div>
                    {canCreate && (
                        <NavLink to={ROUTES.DASHBOARD.FILE_MOVEMENTS_CREATE}>
                            <Button className="w-full h-11 px-5 rounded-xl bg-primary hover:bg-primary-hover text-primary-foreground shadow-lg shadow-primary/20 cursor-pointer flex items-center justify-center gap-2 transition-all active:scale-95">
                                <Plus className="h-5 w-5" />
                                <span className="font-bold">إضافة حركة جديدة</span>
                            </Button>
                        </NavLink>
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
