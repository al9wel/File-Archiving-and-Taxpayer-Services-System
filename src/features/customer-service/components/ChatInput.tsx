import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Paperclip, Send } from "lucide-react"

const ChatInput = () => {
    return (
        <div className="border-t border-border bg-card/95 px-4 py-4 backdrop-blur supports-[backdrop-filter]:bg-card/80 md:px-6">
            <div className="flex items-center gap-2 rounded-2xl border border-border bg-background p-2 shadow-sm">
                <Button variant="ghost" size="icon" type="button" aria-label="إرفاق ملف" className="shrink-0">
                    <Paperclip />
                </Button>
                <Input
                    className="h-10 border-0 bg-transparent px-2 text-sm shadow-none focus-visible:border-0 focus-visible:ring-0"
                    placeholder="اكتب رسالة..."
                />
                <Button type="button" size="icon" aria-label="إرسال" className="shrink-0">
                    <Send />
                </Button>
            </div>
        </div>
    )
}

export default ChatInput
