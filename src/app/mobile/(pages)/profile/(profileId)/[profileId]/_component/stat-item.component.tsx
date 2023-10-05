export default function StatItem({ label, value }
    : { label: string, value: number | string }) {
    return (
        <div className="text-center">
            <div className="font-bold">
                {value}
            </div>
            <div>
                {label}
            </div>
        </div>
    )
}