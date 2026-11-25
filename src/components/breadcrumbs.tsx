import { JsonLd } from "./json-ld";
import { breadcrumbs } from "@/lib/seo";
export function Breadcrumbs({
  items,
}: {
  items: { name: string; path: string }[];
}) {
  return (
    <>
      <JsonLd data={breadcrumbs(items)} />
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <ol>
          {items.map((item, i) => (
            <li key={item.path}>
              {i === items.length - 1 ? (
                <span aria-current="page">{item.name}</span>
              ) : (
                <a href={item.path}>{item.name}</a>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
