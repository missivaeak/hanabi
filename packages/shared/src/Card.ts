export const colors = ["a", "b", "c", "d", "e"] as const;
export type Color = (typeof colors)[number];
