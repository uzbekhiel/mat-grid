import { Component, OnInit, Input, ViewChild, Output, EventEmitter, ElementRef } from '@angular/core';
import { fromEvent as observableFromEvent, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { GridColumns } from '../models/grid-columns.model';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent implements OnInit {

  @Input() searchVisible = true;
  @Input() dropMenu = true;
  @Input() name: string;
  @Input() columns: GridColumns[];

  @ViewChild('filter', { static: true }) filter: ElementRef;
  @Output() filterChange = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit() {
    this.columns.forEach(e => {
      e.visible = e.visible === undefined ? true : e.visible;
    });
    if (this.filter !== undefined) {
      observableFromEvent(this.filter.nativeElement, 'keyup').pipe(
        distinctUntilChanged(),
        debounceTime(150))
        .subscribe(() => {
          this.filterChange.emit(this.filter.nativeElement.value);
        });
    }
  }

  toggleColumnVisibility(column, event) {
    event.stopPropagation();
    event.stopImmediatePropagation();
    column.visible = !column.visible;
  }

}
