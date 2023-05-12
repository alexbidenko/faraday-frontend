declare module '*.jpg' {
  const value: string;
  export = value;
}

declare module '*.png' {
  const value: string;
  export = value;
}

declare module '*.svg?url' {
  const value: string;
  export = value;
}
