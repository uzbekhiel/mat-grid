import {
  Component, OnInit, Input, EventEmitter, Output, ViewChildren, QueryList
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { SortOrder } from '../models/sort-order';
import { FieldTypeEnum } from '../enums/field-types.enum';

@Component({
  selector: 'mat-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})

export class GridComponent<T> implements OnInit {
  public selectedRowIndex: number;
  public sortedData: SortOrder = new SortOrder();
  private sortedColumns = [];
  private selectedColumns = [];
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
  @Input('selection') hasSelectionColumn = false;
  @Input() selectionPosition = 'first' || 'end' || '';
  @Input() hasPagination = null;
  @Input() title = '';
  @Input() noDataText = '';
  @Input() pageSizeOptions = [5, 10, 25, 100];
  @Input('actionsMenuAwaysVisible') actionsVisible = false;

  @Output() dropActionsFn: EventEmitter<any> = new EventEmitter();
  @Output() columnActionsButtonClick: EventEmitter<any> = new EventEmitter();
  @Output() loadingGridFn = new EventEmitter();
  @Output() columnValue = new EventEmitter();
  @Output() selectedRows = new EventEmitter();
  @Output('search') searchData = new EventEmitter();

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  @ViewChildren(MatPaginator) paginator: QueryList<MatPaginator>;

  constructor() { }

  ngOnInit() {
    if (this.sortActiveColumn != '') {
      this.sortedColumns.push(this.sortActiveColumn);
    }
    if (this.hasSelectionColumn) {
      switch (this.selectionPosition) {
        case 'end':
          this.columns.push({ header: 'Checkbox', property: 'select', size: 5, hasHtml: true, field: { type: FieldTypeEnum.checkbox } });
          break;
        default:
          this.columns.unshift({ header: 'Checkbox', property: 'select', size: 5, hasHtml: true, field: { type: FieldTypeEnum.checkbox } });
          break;
      }
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
    if (this.DataSourceIsArray) {
      if (property === 'select') {
        if (index === undefined && event) {
          (this.dataSource as any).forEach(e => {
            this.selectedColumns.push(e);
          });
        } else if (index === undefined && !event) {
          this.selectedColumns = [];
        } else {
          this.selectedColumns.push(this.dataSource[index]);
        }
      } else {
        this.dataSource[index][property] = event;
        this.columnValue.emit({ property, item: this.dataSource[index] });
        this.selectedRows.emit({ rows: this.selectedColumns });
      }
    } else {
      if (property === 'select') {
        if (index === undefined && event) {
          (this.dataSource as any).data.forEach(e => {
            this.selectedColumns.push(e);
          });
        } else if (index === undefined && !event) {
          this.selectedColumns = [];
        } else {
          this.selectedColumns.push((this.dataSource as any).data[index]);
        }
      } else {
        (this.dataSource as any).data[index][property] = event;
        this.columnValue.emit({ property, item: (this.dataSource as any).data[index] });
        this.selectedRows.emit({ rows: this.selectedColumns });
      }
    }
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

  public getSelectValue(row: any): boolean {
    return this.selectedColumns.filter(a => a === row).length > 0;
  }

}
