import { Card, CardContent } from "@/components/ui/card"
import { MessageCircle, Sparkles } from "lucide-react"

interface EmptyConversationStateProps {
    title?: string
}

const EmptyConversationState = ({ title = "لا توجد رسائل بعد" }: EmptyConversationStateProps) => {
    return (
        <Card className="border-dashed border-border/80 bg-card/70 shadow-sm">
            <CardContent className="flex min-h-[320px] flex-col items-center justify-center p-8 text-center">
                <div className="relative mb-6 flex h-28 w-28 items-center justify-center rounded-full bg-primary/10">
                    <div className="absolute h-20 w-20 rounded-full border border-primary/20" />
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
                        <MessageCircle size={30} />
                    </div>
                    <Sparkles className="absolute left-3 top-4 text-amber-500" size={18} />
                </div>
                <h3 className="text-lg font-black text-foreground">{title}</h3>
                <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                    ستظهر المحادثات والرسائل هنا عند توفرها.
                </p>
            </CardContent>
        </Card>
    )
}

export default EmptyConversationState
