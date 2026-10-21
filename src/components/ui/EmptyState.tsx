
interface EmptyStateProps {
    message: string
}

const EmptyState = ({ message }: EmptyStateProps) => {
    return (
        <div className="px-5 py-10 text-center text-muted-foreground text-sm">
            {message}
        </div>
    )
}

export default EmptyState