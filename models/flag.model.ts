import { Option } from './option.model';

export interface Flag {
    type: string;
    items: Option[];
    default?: Option;
}
