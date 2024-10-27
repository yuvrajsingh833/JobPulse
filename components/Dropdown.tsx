import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface DropdownProps {
  name: string;
  state: any;
  setState: (e: any) => void;
  options: any[];
  disabled?: boolean;
}

export default function Dropdown(props: DropdownProps) {
  const { name, state, setState, options, disabled } = props;

  const handleChange = (event: SelectChangeEvent) => {
    setState(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth disabled={disabled ?? false}>
        <InputLabel id="demo-simple-select-label">{name}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={state}
          label={name}
          onChange={handleChange}
        >
          {options.map((option: any, i: number) => (
            <MenuItem key={i} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
