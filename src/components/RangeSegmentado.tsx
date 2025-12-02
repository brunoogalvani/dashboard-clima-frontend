const ranges = [
    { name: "Boa", min: 0, max: 50, color: "#59B61F" }, // antigo: #59B61F
    { name: "Moderada", min: 51, max: 100, color: "#EEC732" }, // antigo: #EEC732
    { name: "Ruim p/ grupos sensíveis", min: 101, max: 150, color: "#EA8C34" },// antigo: #EA8C34
    { name: "Ruim", min: 151, max: 200, color: "#E95478" }, // antigo: #E95478
    { name: "Muito ruim", min: 201, max: 300, color: "#B33FBA" }, // antigo: #B33FBA
    { name: "Perigosa", min: 301, max: 500, color: "#C92033" } // antigo: #C92033  
];

export default function RangeSegmentado({ value }: { value: number }) {
    const blockCount = ranges.length;
    const blockWidthPercent = 100 / blockCount;

    const index = ranges.findIndex(r => value >= r.min && value <= r.max);
    const safeIndex = index === -1 ? blockCount - 1 : index;
    const range = ranges[safeIndex];

    const percentInsideBlock =
        index === -1
            ? 100
            : ((value - range.min) / (range.max - range.min)) * 100;

    const pos =
        safeIndex * blockWidthPercent +
        (percentInsideBlock / 100) * blockWidthPercent;

    const indicadorCor = range.color ?? "#000"

    return (
        <div className="flex w-full items-center relative">
            <div
                className="absolute translate-x-[-50%] translate-y-[10%] w-4 h-4 bg-white border-4 rounded-full z-10"
                style={{ left: `${pos}%`, borderColor: indicadorCor }}
            />

            {ranges.map((r, i) => (
                <div key={r.name} className="flex-1 flex flex-col relative text-black">
                    <span className="text-sm font-semibold text-center">{r.name}</span>

                    <div className={`h-2 my-1 ${i === 0 ? "rounded-l-full" : ""} ${i === ranges.length - 1 ? "rounded-r-full" : ""}`} style={{ backgroundColor: r.color }} />

                    <div className={`flex justify-between text-xs opacity-70 ${i === 0 ? '' : 'translate-x-[-5%]'}`}>
                        <span>{i === 0 ? r.min : r.min-1}</span>
                        {i === 5 ? <span className="translate-x-[30%]">{r.max}+</span> : null}
                    </div>
                </div>
            ))}
        </div>
    );
}
