export const jsonRenderSpec = {
  type: "Stack",
  props: { gap: "large" },
  children: [
    { type: "Stack", children: [
      { type: "Metric", props: { label: "Net revenue", value: "$84,290", trend: "+18.4%", tone: "positive" } },
      { type: "Metric", props: { label: "Active customers", value: "2,481", trend: "+9.7%", tone: "positive" } },
      { type: "Metric", props: { label: "Avg. order value", value: "$142.80", trend: "+4.2%", tone: "positive" } },
    ]},
    { type: "Stack", children: [
      { type: "Heading", props: { children: "Revenue by channel" } },
      { type: "Bar", props: { label: "Direct", value: 78 } },
      { type: "Bar", props: { label: "Partner", value: 56 } },
      { type: "Bar", props: { label: "Organic", value: 42 } },
      { type: "Bar", props: { label: "Paid", value: 29 } },
    ]},
    { type: "Callout", props: { mark: "↗", title: "A strong start to the week", body: "Direct revenue is pacing 12% above your weekly target. Keep the momentum going." } },
  ],
};
