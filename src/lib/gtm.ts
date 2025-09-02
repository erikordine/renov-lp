export type GTMEvent = { event: string } & Record<string, unknown>;

declare global {
  interface Window {
    dataLayer?: GTMEvent[];
  }
}

export function pushToDataLayer(e: GTMEvent) {
  if (typeof window !== "undefined" && Array.isArray(window.dataLayer)) {
    window.dataLayer.push(e);
  }
}
