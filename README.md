# mat-grid

## About
This project came from a need to have a configurable grid solution to streamline the development of GRUDs.

## Requirements
A project with:
  - angular v8.0 or greater;
  - material design for angular v8.2.3 or higher

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

Where `datasource` is any type of structure used as your application's data source as an` array` or even a `MatTableDataSource`. (see [material table API](https://material.angular.io/components/table/overview) 

[Demo here](https://stackblitz.com/edit/base-example)

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
        
Apart from the flag type, explained later, the other types can receive a format assigned in the `format` property, following the settings for the use of pipes listed in the angular API (see [Pipes API List](https://angular.io/api?type=pipe))
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
