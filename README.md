# mat-grid

## About
This project came from a need to have a configurable grid solution to streamline the development of CRUDs.

## Requirements
A project with:
  - angular v8.0 or greater;
  - material design for angular v8.2.3 or higher;
  - flex layout for angular v8.0.0-beta.27

### Usage:
#### Basic
To use the grid, a simple configuration with this code structure is enough:

    tableDataSource = dataSource;
    public  columns: GridColumns[] = [
		    { 
			    header:  string, 
			    property:  string 
		   },
    ] as  GridColumns[];

Where `datasource` is any type of structure used as your application's data source as an` array` or even a `MatTableDataSource`. (see [material table API](https://material.angular.io/components/table/overview)) .
There is a type named GridDataSource that can be used as datasource too, but for this you must extends it on a DataSource of yours and implements some kind of a loading data method, as bellow:

    import { employees } from  './base-data';
	import { GridDataSource } from  './mat-grid/models/grid-data-source.model';
    export  class  BaseData  extends  GridDataSource<BaseData> {
	    constructor() {
		    super();
	    }
	    loadData() {
		    this.subject.next(employees);
	    }
    }

The imported constant `employees`is a array of data. The import path depedns on where the module is on your system.
As HTML using the code bellow:

    <mat-grid [title]="title" [noDataText]="noData" [dropMenu]=true [dataSource]="tableDataSource" [columns]="columns"></mat-grid>

On the `title`property put the name to the grid, if it has it. On `noDataText`some text to appear when there is no data to print. There is still `dropMenu`as a boolean to determine if there is or not a menu on title bar.

[Demo with basic array as datasource here](https://stackblitz.com/edit/base-example)

[Demo with GridDataSource as datasource here](https://stackblitz.com/edit/base-example-using-datasource)

#### Types
The grid columns accept some types already mapped:

    date, number, percent, currency, upper, lower, titlecase, text, flag

All are mapped in the enumerator `ColumnTypeEnum`.
Their use is done as follows:

    columns: GridColumns[] = [
        { 
	        header:  string, 
	        property:  string, 
	        type:{ 
		        columnType: ColumnTypeEnum
		        format?: string 
		        } 
        },] as  GridColumns[];
        
Apart from the flag type, explained later, the other types can receive a format assigned in the `format` property, following the settings for the use of pipes listed in the angular API (see [Pipes API List](https://angular.io/api?type=pipe)).
Types for texts as lower(to lowercase), upper( to UPPERCASE) and titlecase(to Title Case) don´t need format.
[Common types demo here](https://stackblitz.com/edit/type-example)

The flag type is a special type created specifically for columns that contain enumerated data, such as that of domain tables.
The usage structure is similar to that used by the other types but depends on another configuration property called `flag`, as shown below:
    
    columns: GridColumns[] = [
       { 
	       header:  string, 
	       property:  string, 
	       type:{ 
			       columnType: ColumnTypeEnum, 
			       flag: { 
					       type:  string, 
					       items: [
									{ text:  string, value:  number },] 
							} 
				} 
		},] as  GridColumns[];
		
[Flag type demo here](https://stackblitz.com/edit/flag-example)

#### Size
You can change the basic size assumed by the columns, setting a value that will be assumed as a percentage by the table as follows:

    tableDataSource = dataSource;
    	public  columns: GridColumns[] = [
            { header:  string, property:  string, size: number },
        ] as  GridColumns[];

Where size will be the percentage value that will be assumed by css when drawing the grid.
[Demo here](https://stackblitz.com/edit/size-example)
