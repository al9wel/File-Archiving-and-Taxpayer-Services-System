import * as React from "react";
import { Check, ChevronsUpDown, Loader2, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { useDebounce } from "@/hooks/useDebounce";
import { cn } from "@/lib/utils";
import { useSearchFiles } from "../../hooks/files/useSearchFiles";
import type { File } from "@/types/File";

type Props = {
    value?: number;
    onSelect: (id: number) => void;
    mode?: "select" | "search";
    placeholder?: string;
    searchPlaceholder?: string;
    className?: string;
    popoverClassName?: string;
    disabled?: boolean;
};

export function FileSearchSelect({
    value,
    onSelect,
    mode = "select",
    placeholder,
    searchPlaceholder = "البحث عن ملف...",
    className,
    popoverClassName,
    disabled
}: Props) {
    const [open, setOpen] = React.useState(false);
    const [search, setSearch] = React.useState("");
    const debouncedSearch = useDebounce(search, 500);

    const { data: queryData, isPending, isError } = useSearchFiles(debouncedSearch);
    const data = queryData?.data;

    const selectedFile = data?.find(
        (item: File["fileInfo"]) => Number(item.id) === value
    );

    const getFileLabel = (file: File["fileInfo"]) => {
        return `ملف رقم: ${file.taxNumber} - ${file.taxPayer?.tradeName || "مكلف"}`;
    };

    const isSearchMode = mode === "search";
    const triggerPlaceholder = placeholder || (isSearchMode ? "البحث عن ملف..." : "اختر الملف...");

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    type="button"
                    variant="outline"
                    role="combobox"
                    disabled={disabled}
                    className={cn(
                        "w-full h-12 border-muted-foreground/10",
                        isSearchMode
                            ? "justify-start gap-2 rounded-3xl bg-muted p-3 text-xs font-normal text-muted-foreground dark:border-input dark:bg-muted/50"
                            : "justify-between rounded-xl bg-muted/30",
                         className
                     )}
                 >
                     {isSearchMode && <Search className="size-4 shrink-0 opacity-70" />}
                     <span className="truncate text-right">
                         {selectedFile ? getFileLabel(selectedFile) : triggerPlaceholder}
                     </span>
                     {!isSearchMode && <ChevronsUpDown className="opacity-50" />}
                 </Button>
             </PopoverTrigger>

             <PopoverContent
                 className={cn(
                     "w-[400px] p-0",
                     isSearchMode && "w-[var(--radix-popover-trigger-width)] min-w-[320px]",
                     popoverClassName
                 )}
                 align="end"
                 dir="rtl"
             >
                 <Command shouldFilter={false} dir="rtl">
                     <CommandInput
                         placeholder={searchPlaceholder}
                         value={search}
                         onValueChange={setSearch}
                     />

                     <CommandList>
                         {isPending && (
                             <div className="flex items-center justify-center py-6">
                                 <Loader2 className="size-5 animate-spin" />
                             </div>
                         )}

                         {isError && (
                             <p className="p-4 text-sm text-destructive">
                                فشل تحميل الملفات
                            </p>
                        )}

                        {!isPending && !isError && data?.length === 0 && (
                            <CommandEmpty>لا توجد نتائج.</CommandEmpty>
                        )}

                        {!isPending &&
                            !isError &&
                            data?.map((file: File["fileInfo"]) => (
                                <CommandItem
                                    key={file.id}
                                    value={`${getFileLabel(file)} - #${file.id}`}
                                    onSelect={() => {
                                        onSelect(Number(file.id));
                                        setOpen(false);
                                        setSearch("");
                                    }}
                                    className="cursor-pointer"
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 size-4",
                                            value === Number(file.id) ? "opacity-100" : "opacity-0"
                                        )}
                                    />

                                    <div className="flex flex-col flex-1 mr-2 text-right">
                                        <span>{getFileLabel(file)}</span>
                                        <span className="text-xs text-muted-foreground">
                                            رقم الحصر: {file.inventoryNumber || "-"}
                                        </span>
                                    </div>
                                </CommandItem>
                            ))}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
