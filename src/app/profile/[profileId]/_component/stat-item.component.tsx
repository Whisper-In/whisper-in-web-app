export default function StatItem({ label, value }
    : { label: string, value: number | string }) {
    const id = `stat-label-${label.replaceAll(" ", "-")}`;

    return (
        <div className="text-center">
            <div className="font-bold" aria-labelledby={id}>
                {value}
            </div>
            <div id={id}>
                {label}
            </div>
        </div>
    )
}