interface Props {
    title: string;
    date: string;
    isAbove: boolean;
}


export default function EventCard({ title, date, isAbove }: Props) {

    return (
        <div className="relative flex flex-col items-center">

            {isAbove && (
                <div className="w-48 text-center mb-4">
                    <h3 className="text-sm font-semibold text-neutral-50">{title}</h3>
                    <p className="text-xs text-neutral-400">{date}</p>
                </div>
            )}

            <span className="inline-block w-3 h-3 rounded-full aura pulsate border border-secondary-600 bg-transparent" />

            {!isAbove && (
                <div className="w-48 text-center mt-4">
                    <h3 className="text-sm font-semibold text-neutral-50">{title}</h3>
                    <p className="text-xs text-neutral-400">{date}</p>
                </div>
            )}

        </div>
    );
}
