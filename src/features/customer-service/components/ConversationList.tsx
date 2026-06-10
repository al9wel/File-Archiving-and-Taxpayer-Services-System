import { MessageSquareText, Search } from "lucide-react"
import type { Chat } from "@/types/CustomerService"
import ConversationCard from "./ConversationCard"
import EmptyConversationState from "./EmptyConversationState"
import { Input } from "@/components/ui/input"
import { useState, useMemo } from "react"

interface ConversationListProps {
    conversations: Chat[]
}

const ConversationList = ({ conversations }: ConversationListProps) => {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredConversations = useMemo(
        () => conversations.filter((conv) =>
            conv.userName?.toLowerCase().includes(searchQuery.toLowerCase())
        ),
        [conversations, searchQuery]
    );

    if (!conversations.length) {
        return <EmptyConversationState title="لا توجد محادثات حالياً" />
    }

    return (
        <>
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
                <div className="flex flex-col gap-5 p-5 md:flex-row md:items-center md:justify-between md:p-6">
                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                            <MessageSquareText size={26} />
                        </div>
                        <div>
                            <h1 className="text-2xl font-black tracking-normal text-foreground">خدمة العملاء</h1>
                            <p className="mt-1 text-sm text-muted-foreground">متابعة وإدارة محادثات العملاء</p>
                        </div>
                    </div>
                    <div className="relative w-full md:w-80">
                        <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                        <Input
                            className="h-10 rounded-xl bg-background pr-9 border-border"
                            placeholder="البحث عن محادثة..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {filteredConversations.map((conversation) => (
                    <ConversationCard key={conversation.id} conversation={conversation} />
                ))}
            </div>
        </>
    )
}

export default ConversationList
