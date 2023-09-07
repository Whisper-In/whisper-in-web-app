export default function Header({ children }: React.PropsWithChildren) {
    return (
        <div className="min-h-[88px] shadow-md flex flex-col justify-end px-4 pb-2 bg-surface">
            {children}
        </div>
    );
}