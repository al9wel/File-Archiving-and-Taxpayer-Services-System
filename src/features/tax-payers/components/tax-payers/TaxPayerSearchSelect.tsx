import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import * as React from "react";

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

import { cn } from "@/lib/utils";

import { useDebounce } from "@/hooks/useDebounce";

import { useSearchTaxPayers } from "../../hooks/tax-payers/useSearchTaxPayers";

type Props = {
  value?: number;
  onSelect: (id: number) => void;
  disabled?: boolean;
};

export function TaxPayerSearchSelect({ value, onSelect, disabled }: Props) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const debouncedSearch = useDebounce(search, 500);

  const {
    data: queryData,
    isPending,
    isError,
  } = useSearchTaxPayers(debouncedSearch);

  const data = queryData?.data;

  const selectedTaxPayer = data?.find((item) => item.taxPayerId === value);

  const getFileTypeLabel = (fileType?: string) => {
    if (fileType === "Individual") return "فرد";
    if (fileType === "Company") return "شركة";
    if (fileType === "CharitableCompany") return "خيرية";
    return "غير محدد";
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          role="combobox"
          disabled={disabled}
          className="w-full justify-between h-12 rounded-xl bg-muted/30 border-muted-foreground/10"
        >
          {selectedTaxPayer
            ? `${selectedTaxPayer.tradeName} - ${getFileTypeLabel(selectedTaxPayer.taxPayerFileType)}`
            : "اختر المكلف..."}

          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[400px] p-0 bg-white" align="end" dir="rtl">
        <Command shouldFilter={false} dir="rtl" className="bg-white">
          <CommandInput
            placeholder="البحث عن مكلف..."
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
              <p className="p-4 text-sm text-red-500">فشل تحميل المكلفين</p>
            )}

            {!isPending && !isError && data?.length === 0 && (
              <CommandEmpty>لا توجد نتائج.</CommandEmpty>
            )}

            {!isPending &&
              !isError &&
              data?.map((taxPayer: any) => (
                <CommandItem
                  key={taxPayer.taxPayerId}
                  value={taxPayer.tradeName}
                  onSelect={() => {
                    onSelect(taxPayer.taxPayerId);
                    setOpen(false);
                  }}
                  className="cursor-pointer"
                >
                  <Check
                    className={cn(
                      "mr-2 size-4",
                      value === taxPayer.taxPayerId
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />

                  <div className="flex flex-col flex-1 mr-2 text-right">
                    <span className="flex items-center gap-2">
                      <span>{taxPayer.tradeName}</span>
                      <span className="rounded-full bg-red-50 px-2 py-0.5 text-xs font-bold text-red-600 dark:bg-red-950/40 dark:text-red-300">
                        {getFileTypeLabel(taxPayer.taxPayerFileType)}
                      </span>
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {taxPayer.taxNumber || "-"}
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
