import type { CustomerServiceConversation } from "../types/CustomerService"
import ConversationCard from "./ConversationCard"
import EmptyConversationState from "./EmptyConversationState"

interface ConversationListProps {
    conversations: CustomerServiceConversation[]
}

const ConversationList = ({ conversations }: ConversationListProps) => {
    if (!conversations.length) {
        return <EmptyConversationState title="لا توجد محادثات حالياً" />
    }

    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {conversations.map((conversation) => (
                <ConversationCard key={conversation.id} conversation={conversation} />
            ))}
        </div>
    )
}

export default ConversationList
