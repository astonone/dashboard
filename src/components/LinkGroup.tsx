import { Card, CardContent } from "@/components/ui/card"
import type { BookmarkGroup } from "@/utils/types"

interface Props {
    group: BookmarkGroup
}

export default function LinkGroup({ group }: Props) {
    const [title] = Object.keys(group)
    const links = group[title]

    return (
        <Card className="bg-white/10 backdrop-blur-md border border-white/10 shadow-md">
            <CardContent className="text-white">
                <h2 className="text-lg font-semibold mb-2 drop-shadow">{title}</h2>
                <div className="flex flex-col gap-2">
                    {links.map((link, idx) => (
                        <a
                            key={idx}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30 text-white transition"
                        >
                            {link.image ? (
                                <img src={link.image} alt={link.label} className="w-5 h-5" />
                            ) : link.icon ? (
                                <span className="iconify w-5 h-5" data-icon={link.icon}></span>
                            ) : null}
                            <span>{link.label}</span>
                        </a>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
