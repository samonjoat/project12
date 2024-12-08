export interface ColumnMapping {
  sourceNameColumn: string;
  sourceValueColumn: string;
  targetColumn: string;
}

export interface FileMapping {
  fileName: string;
  columnMappings: ColumnMapping[];
}