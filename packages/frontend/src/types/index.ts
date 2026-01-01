export type Result<T extends any = void> =
  | {
      value: T;
      error: null;
    }
  | {
      value: null;
      error: string;
    };

export type GameRunnerSteps = (() => Promise<Result<void>>)[];
