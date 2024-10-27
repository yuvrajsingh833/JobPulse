import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRemove } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

library.add(faRemove);

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface FilterProps {
  statuses: string[];
  filter: string[];
  setFilter: (e: any) => void;
  children: any;
}

export default function Filter(props: FilterProps) {
  const { statuses, filter, setFilter, children } = props;

  const handleChange = (event: SelectChangeEvent<typeof filter>) => {
    const {
      target: { value },
    } = event;
    if (value.includes("Clear All")) {
      setFilter([]);
    } else {
      setFilter(
        typeof value === "string" ? value.split(",") : value
      );
    }
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 200 }}>
        <InputLabel id="demo-multiple-checkbox-label">{children}</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={filter}
          onChange={handleChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
        >
          {statuses.map((status: string) => (
            <MenuItem key={status} value={status}>
              <Checkbox checked={filter.indexOf(status) > -1} />
              <ListItemText primary={status} />
            </MenuItem>
          ))}
          <MenuItem value={"Clear All"} className="flex items-center gap-2">
          <FontAwesomeIcon icon={faRemove} />
            <ListItemText primary={"Clear All"} />
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
