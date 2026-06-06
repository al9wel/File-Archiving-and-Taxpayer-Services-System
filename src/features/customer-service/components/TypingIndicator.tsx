const TypingIndicator = () => {
    return (
        <div className="flex justify-start">
            <div className="flex items-center gap-1 rounded-2xl rounded-tl-md border border-border bg-card px-4 py-3 shadow-sm">
                <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/60 [animation-delay:-0.2s]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/60 [animation-delay:-0.1s]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/60" />
            </div>
        </div>
    )
}

export default TypingIndicator
