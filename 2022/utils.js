export const pipe =
  (...fns) =>
  (x) =>
    fns.reduceRight((a, f) => f(a), x);
