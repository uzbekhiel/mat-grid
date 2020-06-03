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
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TranslateModule } from '@ngx-translate/core';
import { GridComponent } from './grid/grid.component';
import { InputComponent } from './input/input.component';
import { ColumnDataComponent } from './column-data/column-data.component';
import { TitleComponent } from './title/title.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [GridComponent, InputComponent, ColumnDataComponent, TitleComponent],
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
    TranslateModule,
    MatTooltipModule,
    MatSlideToggleModule,
    FlexLayoutModule,
    MatCardModule,
    MatProgressSpinnerModule
  ],
  exports: [
    GridComponent,
    TranslateModule
  ],
  entryComponents: [InputComponent]
})
export class MatGridModule { }
