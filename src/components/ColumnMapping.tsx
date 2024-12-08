import React, { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { MasterSheetSettings } from './MasterSheetSettings';
import { FileMappingAccordion } from './FileMappingAccordion';
import { FileMapping } from '../types/mapping';

interface ColumnMappingProps {
  files: File[];
  masterColumns: string[];
  mappings: Record<string, FileMapping>;
  onMappingChange: (fileName: string, mapping: FileMapping) => void;
  onHeaderRowChange: (row: number) => void;
  onNameColumnChange: (column: string) => void;
  headerRow: number;
  nameColumn: string;
  sourceColumns: string[];
}

export const ColumnMapping: React.FC<ColumnMappingProps> = ({
  files,
  masterColumns,
  mappings,
  onMappingChange,
  onHeaderRowChange,
  onNameColumnChange,
  headerRow,
  nameColumn,
  sourceColumns,
}) => {
  // Initialize mappings for new files
  useEffect(() => {
    files.forEach(file => {
      if (!mappings[file.name]) {
        onMappingChange(file.name, {
          fileName: file.name,
          columnMappings: []
        });
      }
    });
  }, [files, mappings, onMappingChange]);

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        Column Mapping Configuration
      </Typography>

      <MasterSheetSettings
        headerRow={headerRow}
        nameColumn={nameColumn}
        masterColumns={masterColumns}
        onHeaderRowChange={onHeaderRowChange}
        onNameColumnChange={onNameColumnChange}
      />

      {files.map((file) => (
        <FileMappingAccordion
          key={file.name}
          file={file}
          mapping={mappings[file.name] || { fileName: file.name, columnMappings: [] }}
          sourceColumns={sourceColumns}
          masterColumns={masterColumns}
          onMappingChange={onMappingChange}
        />
      ))}
    </Box>
  );
};