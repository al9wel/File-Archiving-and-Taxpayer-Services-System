import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send } from "lucide-react"
import { useState } from "react"

interface ChatInputProps {
    onSendMessage: (message: string) => void;
    isSending?: boolean;
}

const ChatInput = ({ onSendMessage, isSending }: ChatInputProps) => {
    const [message, setMessage] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (message.trim() && !isSending) {
            onSendMessage(message.trim());
            setMessage("");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="border-t border-border bg-card/95 px-4 py-4 backdrop-blur supports-[backdrop-filter]:bg-card/80 md:px-6">
            <div className="flex items-center gap-2 rounded-2xl border border-border bg-background p-2 shadow-sm">
                {/* <Button variant="ghost" size="icon" type="button" aria-label="إرفاق ملف" className="shrink-0">
                    <Paperclip />
                </Button> */}
                <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    disabled={isSending}
                    className="h-10 border-0 bg-transparent px-2 text-sm shadow-none focus-visible:border-0 focus-visible:ring-0"
                    placeholder="اكتب رسالة..."
                />
                <Button type="submit" size="icon" aria-label="إرسال" className="shrink-0 size-10 cursor-pointer" disabled={isSending || !message.trim()}>
                    <Send />
                </Button>
            </div>
        </form>
    )
}

export default ChatInput
