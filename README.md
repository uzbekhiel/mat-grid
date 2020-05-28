# mat-grid

## about
This project came from the necesssity of having some component to render a grid with a couple of features based on material design for angular.

### requisites
a project using:

 - angular minimum ver. 8 or more;
 - material design ver. 8 or more;

### Base configuration
the configuration depends on the settings the dataSource property and the columns, made by Gridcolumn model, included on project.

#### GridColumns

|Property        |usage                                       |
|----------------|--------------------------------------------|
|header: *string*  |the name that appers on header of the column|
|property: *string*|name of property from datasource            |
|type: *string*| type of data for the column |
|visible?: *boolean*| sets if column is visible |
|format?: *string*| format to show data on column*, when it does not have has Html flag. |
|isModelProperty?: *boolean*| sets if data is from model data source or not |
|hasPermission?: *boolean*| sets if some kind of permission to access data is necessary. If false hides column. |
|hasHtml?: *boolean*| sets if data is showned on a input based on type set on fields property |
|field?: *Field*| field displayed when using the hasHtml flag  |
|actions?: *Action[]*| array of actions that can be done to the data on the row  |
|flags?: *Flag[]*| array of flags of an enumerator type  |
