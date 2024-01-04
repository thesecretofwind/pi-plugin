
// const modes = ['legacy', 'single', 'dual'] as const;
// export type ModeType = typeof modes[number];

export enum ModeType {
  legacy = 'legacy',
  single = 'single',
  dual   = 'dual'
}

export interface IMode {
  title: string;
  description: string;
  type: ModeType
}
