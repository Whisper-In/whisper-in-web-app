export default function Header({ children, title }: { title?: string } & React.PropsWithChildren) {
    return (
        <div className="min-h-[88px] shadow-md flex flex-col justify-end px-4 pb-2 bg-surface">
            <label className="font-bold text-xl text-onSurface">{title}</label>
            {children}
        </div>
    );
}