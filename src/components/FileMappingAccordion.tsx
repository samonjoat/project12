import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { ColumnMapping, FileMapping } from '../types/mapping';

interface FileMappingAccordionProps {
  file: File;
  mapping: FileMapping;
  sourceColumns: string[];
  masterColumns: string[];
  onMappingChange: (fileName: string, mapping: FileMapping) => void;
}

export const FileMappingAccordion: React.FC<FileMappingAccordionProps> = ({
  file,
  mapping,
  sourceColumns,
  masterColumns,
  onMappingChange,
}) => {
  const handleAddMapping = () => {
    const updatedMappings = [
      ...(mapping?.columnMappings || []),
      { 
        sourceNameColumn: '', 
        sourceValueColumn: '',
        targetColumn: '' 
      }
    ];
    
    onMappingChange(file.name, {
      fileName: file.name,
      columnMappings: updatedMappings
    });
  };

  const handleRemoveMapping = (index: number) => {
    const updatedMappings = mapping.columnMappings.filter((_, i) => i !== index);
    onMappingChange(file.name, {
      ...mapping,
      columnMappings: updatedMappings
    });
  };

  const handleColumnMappingChange = (
    index: number,
    field: keyof ColumnMapping,
    value: string
  ) => {
    const updatedMappings = [...mapping.columnMappings];
    updatedMappings[index] = {
      ...updatedMappings[index],
      [field]: value,
    };

    onMappingChange(file.name, {
      ...mapping,
      columnMappings: updatedMappings
    });
  };

  return (
    <Accordion sx={{ mb: 2 }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>{file.name}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="subtitle1">Column Mappings</Typography>
          <IconButton 
            color="primary" 
            onClick={handleAddMapping}
            size="small"
          >
            <AddIcon />
          </IconButton>
        </Box>
        {(mapping?.columnMappings || []).map((columnMapping, index) => (
          <Box key={index} sx={{ display: 'flex', gap: 2, mb: 2, alignItems: 'center' }}>
            <FormControl fullWidth>
              <InputLabel>Source Name Column</InputLabel>
              <Select
                value={columnMapping.sourceNameColumn}
                onChange={(e) =>
                  handleColumnMappingChange(index, 'sourceNameColumn', e.target.value)
                }
                label="Source Name Column"
              >
                {sourceColumns.map((column) => (
                  <MenuItem key={column} value={column}>
                    {column}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Source Value Column</InputLabel>
              <Select
                value={columnMapping.sourceValueColumn}
                onChange={(e) =>
                  handleColumnMappingChange(index, 'sourceValueColumn', e.target.value)
                }
                label="Source Value Column"
              >
                {sourceColumns.map((column) => (
                  <MenuItem key={column} value={column}>
                    {column}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Target Column</InputLabel>
              <Select
                value={columnMapping.targetColumn}
                onChange={(e) =>
                  handleColumnMappingChange(index, 'targetColumn', e.target.value)
                }
                label="Target Column"
              >
                {masterColumns.map((column) => (
                  <MenuItem key={column} value={column}>
                    {column}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <IconButton 
              color="error" 
              onClick={() => handleRemoveMapping(index)}
              size="small"
            >
              <RemoveIcon />
            </IconButton>
          </Box>
        ))}
      </AccordionDetails>
    </Accordion>
  );
};