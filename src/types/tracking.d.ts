export {}

declare global {
  type GtagArgs = ['js', Date] | ['config', string, Record<string, unknown>?] | ['event', string, Record<string, unknown>?]

  type GtagFunction = (...args: GtagArgs) => void

  interface FbqFunction {
    (...args: unknown[]): void
    callMethod?: (...args: unknown[]) => void
    queue: unknown[][]
    push: FbqFunction
    loaded: boolean
    version: string
  }

  interface Window {
    dataLayer?: unknown[][]
    gtag?: GtagFunction
    fbq?: FbqFunction
    _fbq?: FbqFunction
  }
}
