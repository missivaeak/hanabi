
const uiSignalTypes = ["toast", "explosion"] as const;
export type UiSignalType = (typeof uiSignalTypes)[number];

type UiSignalMap = {
	toast: ToastSignal;
	explosion: ExplosionSignal;
}

type ToastSignal = {
	type: 'toast';
	message: string;
}

type ExplosionSignal = {
	type: 'explosion';
	matrix: DOMMatrix;
}

export type UiSignal<T extends UiSignalType = UiSignalType> = UiSignalMap[T];

