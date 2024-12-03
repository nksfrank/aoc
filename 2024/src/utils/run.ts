export async function run(cb: () => Promise<void>): Promise<void> {
  if (import.meta.env.NODE_ENV !== "production") {
    return;
  }
  return cb();
}
