import { Component, OnInit, Input } from '@angular/core';
import { ColumnTypeEnum } from '../enums/column-type.enum';

@Component({
  selector: 'app-column-data',
  templateUrl: './column-data.component.html',
  styleUrls: ['./column-data.component.scss']
})
export class ColumnDataComponent {
  @Input() val: any;
  @Input() type: ColumnTypeEnum;
  @Input() format: string;
  @Input() flag: any;
  @Input() imageUrl: string;

  constructor() { }

  get columnType() {
    return ColumnTypeEnum;
  }

  get valueIsFlag() {
    return this.flag.items.filter((i: { value: any; }) => i.value === this.val)
      .map((column: { property: any; }) => column.property).length > 0;
  }

}
