import React from 'react'
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import ListItem from '@mui/material/ListItem';
import Checkbox from '@mui/material/Checkbox';

export type CheckBoxListItemProps = {
  title: string;
  disabled?: boolean;
  onChange: (value: boolean) => void;
};
const CheckBoxListItem = ({ title, disabled, onChange }: CheckBoxListItemProps) => {
  const [value, setValue] = React.useState(true);
  const handleChange = (_: any, val: boolean) => {
    if (typeof val !== 'boolean') return;
    setValue(val);
    onChange(val);
  };
  return (
    <ListItem sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
      <FormLabel component="legend">{title}</FormLabel>
      <Box>
        <Checkbox
          defaultChecked
          value={value}
          disabled={disabled}
          onChange={handleChange} />
      </Box>
    </ListItem>
  );
};
export default CheckBoxListItem;
