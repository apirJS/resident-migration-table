export function isServiceMethodSuccess<T>(result: T | Error): result is T {
  return !(result instanceof Error);
}