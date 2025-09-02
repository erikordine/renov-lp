export {};

declare global {
  // Evento genérico do GTM (pode ter outras chaves além de "event")
  type GTMEvent = { event: string } & Record<string, unknown>;

  interface Window {
    dataLayer?: GTMEvent[];
  }
}
