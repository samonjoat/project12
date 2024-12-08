import React from 'react';
import {
  Paper,
  Typography,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';

interface MasterSheetSettingsProps {
  headerRow: number;
  nameColumn: string;
  masterColumns: string[];
  onHeaderRowChange: (row: number) => void;
  onNameColumnChange: (column: string) => void;
}

export const MasterSheetSettings: React.FC<MasterSheetSettingsProps> = ({
  headerRow,
  nameColumn,
  masterColumns,
  onHeaderRowChange,
  onNameColumnChange
}) => {
  const handleHeaderRowChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numValue = parseInt(value, 10);
    if (!isNaN(numValue) && numValue > 0) {
      onHeaderRowChange(numValue);
    }
  };

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="subtitle1" gutterBottom>
        Master Sheet Settings
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Header Row Number"
            type="number"
            value={headerRow || ''}
            onChange={handleHeaderRowChange}
            inputProps={{ min: 1 }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Name Column</InputLabel>
            <Select
              value={nameColumn}
              onChange={(e) => onNameColumnChange(e.target.value)}
              label="Name Column"
            >
              {masterColumns.map((column) => (
                <MenuItem key={column} value={column}>
                  {column}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Paper>
  );
};