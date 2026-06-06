export type ConversationStatus = "Open" | "Pending" | "Closed"

export type MessageSender = "customer" | "agent"

export interface CustomerServiceMessage {
    id: string
    sender: MessageSender
    content: string
    time: string
}

export interface CustomerServiceConversation {
    id: string
    customerName: string
    customerInitials: string
    lastMessage: string
    date: string
    unreadCount: number
    status: ConversationStatus
    messages: CustomerServiceMessage[]
}
