import { Action } from './action.model';
import { Field } from './field.model';
import { Flag } from './flag.model';
import { ColumnTypeEnum } from '../../enums/column-type.enum';

export interface GridColumns {
    header: string;
    property: string;
    type: ColumnTypeEnum;
    visible?: boolean;
    format?: string;
    isModelProperty?: boolean;
    hasPermission?: boolean;
    hasHtml?: boolean;
    actions?: Action[];
    fields?: Field[];
    flags?: Flag;
}