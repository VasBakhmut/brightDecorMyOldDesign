import { Breadcrumbs } from "./breadcrumbs";
import { policies } from "@/lib/policies";
export function PolicyPage({ kind }: { kind: keyof typeof policies }) {
  const policy = policies[kind];
  return (
    <main id="main" className="privacy-page">
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: policy.name, path: `/${kind}` },
        ]}
      />
      <p className="eyebrow">BRIGHT DECOR</p>
      <h1>{policy.name}</h1>
      <p>{policy.intro}</p>
      {policy.sections.map((s) => (
        <section key={s.heading}>
          <h2>{s.heading}</h2>
          <p>{s.text}</p>
        </section>
      ))}
      <div className="policy-related">
        <a href="/privacy">Privacy policy</a>
        <a href="/#contact">Contact Bright Decor</a>
      </div>
    </main>
  );
}
