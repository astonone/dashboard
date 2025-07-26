import { Card, CardContent } from '@/components/ui/card';
import type { BookmarkGroup, BookmarkItem, BookmarkLink } from '@/utils/types';

interface Props {
  group: BookmarkGroup;
  depth?: number;
}

function isLink(item: BookmarkItem): item is BookmarkLink {
  return typeof item === 'object' && 'href' in item;
}

function isGroup(item: BookmarkItem): item is BookmarkGroup {
  return typeof item === 'object' && !('href' in item);
}

export default function LinkGroup({ group, depth = 0 }: Props) {
  const [title] = Object.keys(group);
  const items = group[title];

  const links = items.filter(isLink);
  const subgroups = items.filter(isGroup);

  return (
    <Card className="bg-white/10 backdrop-blur-md border border-white/10 shadow-md">
      <CardContent className="text-white">
        <h2 className={`text-lg font-semibold mb-2 drop-shadow ${depth > 0 ? 'pl-4' : ''}`}>{title}</h2>

        {links.length > 0 && (
          <div className="flex flex-wrap gap-2">
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
        )}

        {subgroups.length > 0 && (
          <div className="mt-4 space-y-4">
            {subgroups.map((subgroup, idx) => (
              <LinkGroup key={idx} group={subgroup} depth={depth + 1} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
