export function cleanProfileData<T extends Record<string, any>>(data: T): T {
  // Only remove nulls at top level (sufficient for this schema)
  return Object.fromEntries(
    Object.entries(data).filter(([_, v]) => v !== null)
  ) as T;
}
