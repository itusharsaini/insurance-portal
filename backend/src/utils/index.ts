export const array_chunks = (rows: any[], chunk_size: number) =>
  rows
  .map((_, i, all) => all.slice(i * chunk_size, (i + 1) * chunk_size))
  .filter((x) => x.length);
