export interface SelectInputItem {
    label: string;
    value: any;
    isRemovable: boolean;
    disabled: boolean;
}

export interface ConfirmDialogData {
    title?: string;
    message?: string;
    btnPositive?: string;
    btnNegative?: string;
    btnPositiveColor?: string;
    btnNegativeColor?: string;
}