import { Flag } from './flag.model';
import { ColumnTypeEnum } from '../enums/column-type.enum';

export interface Type {
    columnType: ColumnTypeEnum;
    format?: string;
    flag?: Flag;
}
