export function assert(truthy: boolean, msg?: string): asserts truthy {
  if (!truthy) {
    throw new Error(msg);
  }
}
