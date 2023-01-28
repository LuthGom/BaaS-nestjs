export function geradorDeContas(max: number): number {
  return Math.floor(Math.random() * max) * 5;
}
