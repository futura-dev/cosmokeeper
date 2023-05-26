// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ParamsOf<T extends (...params: readonly any[]) => any> = T extends (
  ...params: infer P
) => // eslint-disable-next-line @typescript-eslint/no-explicit-any
any
  ? P
  : never;
