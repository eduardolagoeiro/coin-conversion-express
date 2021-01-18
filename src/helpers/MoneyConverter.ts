function convert(
  fromValue: number,
  rate: number,
  opts?: {
    inverse: boolean;
  }
): number {
  if (opts?.inverse) return (1 / rate) * fromValue;
  return fromValue * rate;
}

export default {
  convert,
};
