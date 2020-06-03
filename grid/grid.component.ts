import {
  Component, OnInit, Input, EventEmitter, Output, ViewChildren, QueryList, OnChanges,
  ComponentFactoryResolver
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { SortOrder } from '../models/sort-order';
import { GridDataSource } from '../models/grid-data-source.model';

@Component({
  selector: 'mat-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})

export class GridComponent<T> implements OnInit {
  public selectedRowIndex: number;
  public sortedData: SortOrder = new SortOrder();
  private sortedColumns = [];
  private isVisible = true;
  public hasPermission = true;
  @Input() sortDefaultDirection = 'asc';
  @Input() sortActiveColumn = '';
  @Input() organizerName = '';
  @Input() columns = [];
  @Input() dataSource: T | null;
  @Input() gridActions = [];
  @Input() pageSize = 0;
  @Input() numberOfItems = 0;
  @Input() hasSort = false;
  @Input() dropMenu = true;
  @Input() searchVisible = false;
  @Input() hasPagination = null;
  @Input() title = '';
  @Input() noDataText = '';
  @Input() pageSizeOptions = [5, 10, 25, 100];
  @Input('actionsMenuAwaysVisible') actionsVisible = false;

  @Output() dropActionsFn: EventEmitter<any> = new EventEmitter();
  @Output() columnActionsButtonClick: EventEmitter<any> = new EventEmitter();
  @Output() loadingGridFn = new EventEmitter();
  @Output() columnValue = new EventEmitter();
  @Output('search') searchData = new EventEmitter();

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  @ViewChildren(MatPaginator) paginator: QueryList<MatPaginator>;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    if (this.sortActiveColumn != '') {
      this.sortedColumns.push(this.sortActiveColumn);
    }
  }

  get DataSourceIsArray() {
    return Array.isArray(this.dataSource);
  }

  get visibleColumns() {
    return this.columns.filter(column => column.visible !== undefined ? column.visible : this.isVisible)
      .map(column => column.property);
  }

  get visibleColumnActions() {
    const columnActions = this.columns.filter(column => column.property == 'actions').map(column => column)[0];
    if (columnActions.actions !== undefined) {
      return columnActions.actions.filter(action => action.visible !== undefined ? action.visible : this.isVisible).map(action => action);
    }
    else {
      return [];
    }
  }
  public ShowNoData(): boolean {
    if (this.DataSourceIsArray) {
      return (this.dataSource as any).length === 0;
    } else {
      return (this.dataSource as any).empty;
    }
  }

  public getHighlight(id) {
    this.selectedRowIndex = id;
  }

  public getvalue(event: any, index: number, type: string, property: string) {
    this.dataSource[index][property] = event;
    this.columnValue.emit({ index, value: event, type, property, item: this.dataSource[index] });
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
      this.sortedData.direction = event.direction;
      this.sortedData.property = event.active;
      this.loadingGridFn.emit({ sort: this.sortedData, paginator: this.paginator });
    }
  }

  public search(event: any) {
    this.searchData.emit({ text: event });
  }

}
