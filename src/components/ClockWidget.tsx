import { useEffect, useState } from "react";

export default function ClockWidget() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(interval);
    }, []);

    const timeString = time.toLocaleTimeString("en-GB"); // HH:mm:ss
    const dateString = time.toLocaleDateString("en-GB", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric"
    });
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    return (
        <div className="bg-white/10 backdrop-blur-md text-white p-4 rounded-lg shadow-md border border-white/10 w-fit text-sm text-right">
            <div className="text-xl font-mono">🕒 {timeString}</div>
            <div className="mt-1">{dateString}</div>
            <div className="text-xs text-neutral-300">{timeZone}</div>
        </div>
    );
}
