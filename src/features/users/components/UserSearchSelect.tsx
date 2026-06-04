
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
import type { User } from "@/types/User";

type Props = {
  value?: number | string;
  onSelect: (value: number | string) => void;
  returnValue?: "id" | "phone";
  disabled?: boolean;
};

export function UserSearchSelect({
  value,
  onSelect,
  returnValue = "id",
  disabled
}: Props) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const debouncedSearch = useDebounce(search, 500);

  const { data: queryData, isPending, isError } = useSearchUsers(debouncedSearch);

  const data = queryData?.data;

  const getReturnedValue = (user: User) => {
    return returnValue === "phone" ? (user.phone || "") : user.id;
  }

  const selectedUser = data?.find(
    (item: User) => getReturnedValue(item) === value
  );

  const getUserLabel = (user: User) => {
    return ` ${getReturnedValue(user)}  -  ${user.firstName} ${user.lastName} `
  }

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
            ? getUserLabel(selectedUser)
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
              data?.filter((user: User) => user.role === "Tax_Payer").map((user: User) => (
                <CommandItem
                  key={user.id}
                  value={getUserLabel(user)}
                  onSelect={() => {
                    onSelect(getReturnedValue(user));
                    setOpen(false);
                  }}
                  className="cursor-pointer"
                >
                  <Check
                    className={cn(
                      "mr-2 size-4",
                      value === getReturnedValue(user) ? "opacity-100" : "opacity-0"
                    )}
                  />

                  <div className="flex flex-col flex-1 mr-2 text-right">
                    <span>{getUserLabel(user)}</span>
                    <span className="text-xs text-muted-foreground">
                      {user.userName || "-"}
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
