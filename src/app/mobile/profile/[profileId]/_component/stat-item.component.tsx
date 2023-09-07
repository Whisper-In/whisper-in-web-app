export default function StatItem({ label, value }
    : { label: string, value: number | string }) {
    return (
        <div className="text-center">
            <div className="text-onBackground font-bold">
                {value}
            </div>
            <div className="text-onSurface">
                {label}
            </div>
        </div>
    )
}