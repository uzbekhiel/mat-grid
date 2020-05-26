import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { GridComponent } from './grid/grid.component';
import { InputComponent } from './input/input.component';
import { ColumnDataComponent } from './column-data/column-data.component';


@NgModule({
  declarations: [GridComponent, InputComponent, ColumnDataComponent],
  imports: [
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatIconModule,
    MatMenuModule,
    MatSelectModule,
    MatNativeDateModule,
    MatButtonModule,
    CommonModule,
    FormsModule,
    TranslateModule
  ],
  exports: [
    GridComponent
  ],
  entryComponents: [InputComponent]
})
export class MatGridModule { }
