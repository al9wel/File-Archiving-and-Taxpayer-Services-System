import { useState, useMemo } from "react";
import type { Request } from "@/types/Requests";
import RequestCard from "./RequestCard";
import { Input } from "@/components/ui/input";
import { Search, ClipboardList } from "lucide-react";

interface CardListProps {
    title: string;
    requests: Request[];
}

const CardList = ({ title, requests }: CardListProps) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [fileType, setFileType] = useState("");

    // Client-side search by tradeName — memoized to avoid re-filtering on unrelated renders
    const filteredRequests = useMemo(
        () => requests.filter((req) =>
            req.RequestInfo?.tradeName?.toLowerCase().includes(searchQuery.toLowerCase()) &&
            (!fileType || req.RequestInfo?.fileType === fileType)
        ),
        [requests, searchQuery, fileType]
    );

    return (
        <div className="space-y-6 text-right" dir="rtl">
            {/* Search Section */}
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between bg-card p-4 rounded-2xl border border-border shadow-sm">
                <h2 className="text-xl font-black text-foreground">{title}</h2>
                <div className="grid grid-cols-1 md:grid-cols-[minmax(320px,1fr)_300px] gap-2 w-full lg:max-w-3xl">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-muted-foreground">البحث بالاسم التجاري</label>
                        <div className="relative">
                            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground size-4" />
                            <Input
                                type="text"
                                placeholder="البحث بالاسم التجاري"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pr-10 rounded-xl h-11 border-border bg-background focus-visible:ring-primary focus-visible:border-primary font-bold placeholder:text-muted-foreground/60"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-muted-foreground">نوع الملف</label>
                        <div className="grid grid-cols-4 rounded-xl bg-muted/30 p-1 h-11">
                            {[
                                { value: "", label: "الكل" },
                                { value: "Individual", label: "فرد" },
                                { value: "Company", label: "شركة" },
                                { value: "CharitableCompany", label: "خيرية" },
                            ].map((option) => (
                                <button
                                    key={option.label}
                                    type="button"
                                    onClick={() => setFileType(option.value)}
                                    className={`rounded-lg px-2 text-xs font-bold transition-colors cursor-pointer ${fileType === option.value
                                        ? "bg-primary text-primary-foreground shadow-sm"
                                        : "text-muted-foreground hover:text-foreground"
                                        }`}
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* List Content */}
            {filteredRequests.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 border border-dashed rounded-3xl bg-muted/10 space-y-4">
                    <ClipboardList className="text-muted-foreground/50" size={56} />
                    <h3 className="text-lg font-black text-foreground/80">لا توجد نتائج</h3>
                    <p className="text-muted-foreground text-sm max-w-xs text-center font-bold">
                        {searchQuery || fileType ? "لم نعثر على أي نتائج مطابقة لبحثك." : "لا توجد أي طلبات حالياً."}
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 animate-in fade-in duration-300">
                    {filteredRequests.map((req) => (
                        <RequestCard key={req.RequestInfo.id} request={req} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default CardList;
