import { Action } from './action.model';
import { Field } from './field.model';
import { Type } from './type.model';

export interface GridColumns {
    header: string;
    property: string;
    type?: Type;
    size?: number;
    visible?: boolean;
    hasPermission?: boolean;
    hasHtml?: boolean;
    actions?: Action[];
    field?: Field;
}
