import { Autocomplete, TextField } from "@mui/material";

const AutoCompleteSelect = ({
  options,
  label,
  handleAutoCompleteChange,
  value,
  ...others
}) => {
  return (
    <Autocomplete
      disablePortal
      onChange={handleAutoCompleteChange}
      id="combo-box-questions-select"
      options={options}
      value={value?.label}
      isOptionEqualToValue={(option, value) => option.id === value?.id}
      fullWidth
      renderInput={(params) => (
        <TextField {...params} label={label} color="secondary" />
      )}
      {...others}
    />
  );
};

export default AutoCompleteSelect;
