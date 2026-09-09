"use client";

import { useMemo, useState } from "react";
import { jsonRenderSpec } from "../lib/spec";
import "./styles.css";

type RenderNode = { type: string; props?: Record<string, unknown>; children?: RenderNode[] };

function RenderNodeView({ node }: { node: RenderNode }) {
  const props = node.props ?? {};
  switch (node.type) {
    case "Stack": return <div className="stack">{node.children?.map((child, i) => <RenderNodeView key={i} node={child} />)}</div>;
    case "Metric": return <div className="metric"><span className="metric-label">{String(props.label)}</span><strong>{String(props.value)}</strong><span className={String(props.tone) === "positive" ? "trend positive" : "trend"}>{String(props.trend)}</span></div>;
    case "Bar": return <div className="bar-row"><span>{String(props.label)}</span><div className="bar-track"><i style={{ width: `${Number(props.value)}%` }} /></div><b>{String(props.value)}%</b></div>;
    case "Callout": return <aside className="callout"><span className="callout-mark">{String(props.mark)}</span><div><strong>{String(props.title)}</strong><p>{String(props.body)}</p></div></aside>;
    case "Button": return <button className="action-button" type="button">{String(props.label)}</button>;
    case "Heading": return <h2>{String(props.children)}</h2>;
    default: return null;
  }
}

export default function Page() {
  const [activeTab, setActiveTab] = useState<"preview" | "spec">("preview");
  const [approved, setApproved] = useState(false);
  const renderedSpec = useMemo(() => ({ ...jsonRenderSpec, status: approved ? "approved" : "draft" }), [approved]);

  return <main className="shell">
    <nav className="topbar"><a className="brand" href="/"><span className="brand-mark">jr</span><span>json-render</span></a><div className="nav-right"><span className="pill"><i /> containerized service</span><a href="https://github.com/vercel-labs/json-render" target="_blank" rel="noreferrer">GitHub ↗</a></div></nav>
    <section className="hero"><div className="eyebrow">GENERATIVE UI / SAFE BY DESIGN</div><h1>Describe the interface.<br /><em>Render the result.</em></h1><p>json-render turns model output into production-ready React UI through a constrained component catalog. This demo runs as an isolated container in the cni service collection.</p><div className="hero-actions"><button className="primary" type="button" onClick={() => setApproved(!approved)}>{approved ? "Spec approved" : "Approve this spec"}<span>→</span></button><span className="meta">No API key required · deterministic demo</span></div></section>
    <section className="workbench"><div className="workbench-head"><div><span className="eyebrow">LIVE WORKBENCH</span><h2>Revenue pulse</h2></div><div className="tabs"><button className={activeTab === "preview" ? "active" : ""} onClick={() => setActiveTab("preview")}>Preview</button><button className={activeTab === "spec" ? "active" : ""} onClick={() => setActiveTab("spec")}>JSON spec</button></div></div>{activeTab === "preview" ? <div className="canvas"><div className="canvas-head"><div><span className="overline">MONDAY, SEPTEMBER 9</span><h3>Good morning, Olivia</h3><p>Here&apos;s the shape of your business today.</p></div><span className={`status ${approved ? "status-approved" : ""}`}><i /> {approved ? "approved" : "draft"}</span></div><RenderNodeView node={renderedSpec as RenderNode} /></div> : <pre className="code-panel">{JSON.stringify(jsonRenderSpec, null, 2)}</pre>}</section>
    <section className="principles"><div><span className="eyebrow">WHY IT MATTERS</span><h2>Model freedom.<br /><em>Interface control.</em></h2></div><div className="principle-grid"><article><span>01</span><h3>Constrained</h3><p>Models choose from a catalog you define, keeping output predictable, accessible, and on-brand.</p></article><article><span>02</span><h3>Composable</h3><p>Stream nested layouts and interactive components as JSON, then render them with your own registry.</p></article><article><span>03</span><h3>Portable</h3><p>Run the same generative UI surface anywhere React runs, including this standalone container.</p></article></div></section>
    <footer><span>cni / services / json-render</span><span>built with the Vercel Labs framework</span></footer>
  </main>;
}
