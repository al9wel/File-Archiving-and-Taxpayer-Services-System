import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2 } from "lucide-react"
import { useDepartments } from "../../hooks/departments/useDepartments"
import type { FieldValues, Path, UseFormSetValue, UseFormWatch } from "react-hook-form"

interface AdminDepartmentSelectProps<T extends FieldValues> {
    setValue: UseFormSetValue<T>
    watch: UseFormWatch<T>
    error?: string
    fieldName: Path<T>
}

export const AdminDepartmentSelect = <T extends FieldValues>({
    setValue, watch, error, fieldName
}: AdminDepartmentSelectProps<T>) => {
    const { data: departments, isPending: isLoadingDepts } = useDepartments()

    return (
        <>
            <div className="h-12 w-full">
                <Select
                    onValueChange={(val) => setValue(fieldName, val as any)}
                    value={watch(fieldName) as string}
                    key={watch(fieldName) as string}
                    disabled={isLoadingDepts}
                >
                    <SelectTrigger style={{ height: "100%" }} className="w-full h-full bg-muted/30">
                        {isLoadingDepts ? (
                            <div className="flex items-center gap-2">
                                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                                <span className="text-muted-foreground">جاري التحميل...</span>
                            </div>
                        ) : (
                            <SelectValue placeholder="إختر القسم" />
                        )}
                    </SelectTrigger>
                    <SelectContent>
                        {departments?.data?.map((dept) => (
                            <SelectItem key={dept.id} value={dept.id.toString()}>
                                {dept.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            {error && <p className="text-sm font-medium text-destructive mt-1">{error}</p>}
        </>
    )
}