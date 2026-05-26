
import * as React from "react";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";

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

import { useSearchUsers } from "../hooks/useSearchUsers";

type Props = {
  value?: number;
  onSelect: (id: number) => void;
  disabled?: boolean;
};

export function UserSearchSelect({
  value,
  onSelect,
  disabled
}: Props) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const debouncedSearch = useDebounce(search, 500);

  const { data: queryData, isPending, isError } = useSearchUsers(debouncedSearch);

  const data = queryData?.data;

  const selectedUser = data?.find(
    (item: any) => item.id === value
  );

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
          {selectedUser
            ? `${selectedUser.firstName} ${selectedUser.lastName}`
            : "اختر المستخدم..."}

          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[400px] p-0" align="end" dir="rtl">
        <Command shouldFilter={false} dir="rtl">
          <CommandInput
            placeholder="البحث عن مستخدم..."
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
              <p className="p-4 text-sm text-red-500">
                فشل تحميل المستخدمين
              </p>
            )}

            {!isPending && !isError && data?.length === 0 && (
              <CommandEmpty>لا توجد نتائج.</CommandEmpty>
            )}

            {!isPending &&
              !isError &&
              data?.filter((user: any) => user.role === "Tax_Payer").map((user: any) => (
                <CommandItem
                  key={user.id}
                  value={`${user.firstName} ${user.lastName}`}
                  onSelect={() => {
                    onSelect(user.id);
                    setOpen(false);
                  }}
                  className="cursor-pointer"
                >
                  <Check
                    className={cn(
                      "mr-2 size-4",
                      value === user.id ? "opacity-100" : "opacity-0"
                    )}
                  />

                  <div className="flex flex-col flex-1 mr-2 text-right">
                    <span>{user.firstName} {user.lastName}</span>
                    <span className="text-xs text-muted-foreground">
                      {user.username || "-"}
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
