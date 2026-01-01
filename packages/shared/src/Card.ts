export const colors = ["a", "b", "c", "d", "e"] as const;
export type Color = (typeof colors)[number];
export const pipCounts = [1, 2, 3, 4, 5] as const;
export type PipCount = (typeof pipCounts)[number];
