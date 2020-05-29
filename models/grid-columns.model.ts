import { Action } from './action.model';
import { Field } from './field.model';
import { Flag } from './flag.model';
import { ColumnTypeEnum } from '../enums/column-type.enum';

export interface GridColumns {
    header: string;
    property: string;
    type: ColumnTypeEnum;
    size: number;
    visible?: boolean;
    format?: string;
    hasPermission?: boolean;
    hasHtml?: boolean;
    actions?: Action[];
    field?: Field;
    flag?: Flag;
}
