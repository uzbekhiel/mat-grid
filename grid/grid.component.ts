import {
  Component, OnInit, Input, EventEmitter, Output, ViewChildren, QueryList, OnChanges,
  ComponentFactoryResolver
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { SortOrder } from '../models/sort-order';

@Component({
  selector: 'mat-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})

export class GridComponent<T> implements OnInit {
  public selectedRowIndex: number;
  public sortedData: SortOrder = new SortOrder();
  private sortedColumns = [];
  @Input() sortDefaultDirection = 'asc';
  @Input() sortActiveColumn = '';
  @Input() columns = [];
  @Input() dataSource: T | null;
  @Input() dropActions = [];
  @Input() pageSize = 0;
  @Input() numberOfItems = 0;
  @Input() hasSort = false;
  @Input() hasPagination = null;
  @Input() title = '';
  @Input() pageSizeOptions = [5, 10, 25, 100];
  @Input('actionsMenuAwaysVisible') actionsVisible = false;


  @Output() dropActionsFn: EventEmitter<any> = new EventEmitter();
  @Output() columnActionsButtonClick: EventEmitter<any> = new EventEmitter();
  @Output() loadingGridFn = new EventEmitter();
  @Output() columnValues = new EventEmitter();

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  @ViewChildren(MatPaginator) paginator: QueryList<MatPaginator>;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this.hasPagination = this.hasPagination != null ? this.hasPagination : this.pageSize <= this.numberOfItems;
    if (this.sortActiveColumn != '') {
      this.sortedColumns.push(this.sortActiveColumn);
    }
  }

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

  get visibleColumnActions() {
    const columnActions = this.columns.filter(column => column.property == 'actions').map(column => column)[0];
    return columnActions.actions.filter(action => action.visible).map(action => action);
  }

  public getHighlight(id) {
    this.selectedRowIndex = id;
  }

  public getvalue(event: any, index: number, type: string, property: string) {
    this.columnValues.emit({ index, val: event, type, property });
  }

  public pageChange(event: any) {
    this.pageSize = event.pageSize;
    this.paginator.forEach(c => c.pageIndex = event.pageIndex);
    this.loadingGridFn.emit({ sort: this.sortedData, paginator: this.paginator });
  }

  public sortData(event: any) {
    if (this.sortedColumns.filter(x => x == event.active).length == 0) {
      this.sortedColumns.push(event.active);
    } else {
      console.log(event)
      this.sortedData.direction = event.direction;
      this.sortedData.property = event.active;
      this.loadingGridFn.emit({ sort: this.sortedData, paginator: this.paginator });
    }
  }
}
