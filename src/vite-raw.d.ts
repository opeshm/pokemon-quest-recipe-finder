declare module '*.json?raw' {
  const content: string;
  export default content;
}

declare module '*.json' {
  const value: unknown;
  export default value;
}

interface ImportMeta {
  glob(
    pattern: string,
    options?: {
      eager?: boolean;
      import?: string;
      query?: string | Record<string, string>;
    }
  ): Record<string, unknown>;
}
