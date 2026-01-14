export function formatDateUtc(timestamp: number) {
  return new Date(timestamp).toISOString().slice(0, 10).replaceAll('-', '/');
}
