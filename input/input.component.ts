import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FieldTypeEnum } from '../enums/field-types.enum';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  @Input() val: any;
  @Input() defaultValue: any;
  @Input() type: FieldTypeEnum;
  @Input() options = [];
  @Input() text: string;
  @Input() placeholder = '';

  @Output() value = new EventEmitter();

  constructor() { }

  get fieldType() {
    return FieldTypeEnum;
  }

  ngOnInit(): void {
    this.val = this.val === undefined ? this.defaultValue : this.val;
  }

  public sendValue() {
    this.value.emit(this.val);
  }
}
