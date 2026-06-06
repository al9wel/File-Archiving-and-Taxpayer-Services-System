import { ROUTES } from "@/constants/routes";
import { useSearchFiles } from "@/features/files/hooks/files/useSearchFiles";
import { useDebounce } from "@/hooks/useDebounce";
import type { File } from "@/types/File";
import { Loader2, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
export const FileSearchInput = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const debouncedSearch = useDebounce(search, 500);

  const {
    data: queryData,
    isPending,
    isError,
  } = useSearchFiles(debouncedSearch);
  const files = queryData?.data ?? [];
  const handleSelectFile = (file: File["fileInfo"]) => {
    setSearch("");
    setIsOpen(false);
    navigate(ROUTES.DASHBOARD.FILES_SHOW.replace(":id", file.id.toString()));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <div ref={searchRef} className="relative w-full">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />

      <input
        type="text"
        value={search}
        placeholder="البحث عن ملف..."
        onChange={(e) => {
          setSearch(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        className="border w-full dark:border-input rounded-3xl p-3 pr-4 pl-10 text-xs bg-muted dark:bg-muted/50"
      />

      {isOpen && search.trim() !== "" && (
        <div className="absolute top-full mt-2 right-0 left-0 bg-background border rounded-2xl shadow-lg overflow-hidden z-50">
          {isPending && (
            <div className="flex items-center justify-center gap-2 p-4 text-sm">
              <Loader2 className="size-4 animate-spin" />
              جاري البحث...
            </div>
          )}

          {isError && (
            <div className="p-4 text-sm text-destructive">
              حدث خطأ أثناء البحث
            </div>
          )}

          {!isPending && !isError && files.length === 0 && (
            <div className="p-4 text-sm text-muted-foreground">
              لا توجد نتائج
            </div>
          )}

          {!isPending &&
            files.length > 0 &&
            files.map((file: File["fileInfo"]) => (
              <button
                key={file.id}
                type="button"
                onClick={() => handleSelectFile(file)}
                className="w-full text-right px-4 py-3 hover:bg-muted transition-colors border-b last:border-b-0 cursor-pointer"
              >
                <div className="font-medium">{file.taxPayer.tradeName}</div>

                <div className="text-xs text-muted-foreground">
                  الرقم الضريبي: {file.taxNumber}
                </div>
              </button>
            ))}
        </div>
      )}
    </div>
  );
};
