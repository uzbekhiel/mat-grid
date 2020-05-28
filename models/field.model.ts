import { Option } from './option.model';
import { FieldTypeEnum } from '../enums/field-types.enum';

export interface Field {
    type: FieldTypeEnum;
    text?: string;
    options?: Option[];
    placeholder?: string;
    defaultValue?: any;
}
