import { CSSProperties } from 'react';

import {
    ColumnId
} from 'dash-table/components/Table/props';

export interface ICellProps {
    active: boolean;
    classes: string;
    property: ColumnId;
    style?: CSSProperties;
}

export interface ICellState {
    value: any;
}

export type ICellPropsWithDefaults = ICellProps;
