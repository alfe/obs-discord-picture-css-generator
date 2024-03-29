import FormLabel from '@mui/material/FormLabel';
import ListItem from '@mui/material/ListItem';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

type Option = { label: string; value: string };
export type SelectorToggleButtonGroupProps = {
  title: string;
  value: string[];
  name: string;
  options: Option[];
  onChange: (value: string[]) => void;
};
const SelectorToggleButtonGroup = ({ title, value, name, options, onChange }: SelectorToggleButtonGroupProps) => {
  const handleChange = (_: any, val: string[]) => {
    if (!val) return;
    localStorage.setItem(`${name}`, JSON.stringify(val));
    onChange(val);
  };
  return (
    <ListItem sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <FormLabel component="legend">{title}</FormLabel>
      <ToggleButtonGroup
        color="primary"
        value={value}
        onChange={handleChange}>
        {(options || []).map((item: Option) => (
          <ToggleButton key={`${title}-${item.label}-${item.value}`} value={item.value}>{item.label}</ToggleButton>
        ))}
      </ToggleButtonGroup>
    </ListItem>
  );
};
export default SelectorToggleButtonGroup;
