import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";

const MODES = ["normal", "self", "dependent"];

const Step1 = ({ values, handleInputChange, handleRadioButtonChange }) => {
  return (
    <Box>
      <Grid container spacing={2} my={1} justifyContent="space-between">
        <Grid item xs={12}>
          <TextField
            required
            id="qu"
            label="Question"
            name="question"
            value={values.question}
            variant="standard"
            color="secondary"
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={5}>
          <TextField
            required
            id="order"
            label="Order"
            type="number"
            name="order"
            value={values.order}
            variant="standard"
            color="secondary"
            placeholder="Similar to question number"
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={7}>
          <FormControl fullWidth variant="standard">
            <InputLabel color="secondary">Type</InputLabel>
            <Select
              value={values?.type}
              name="type"
              label="Type"
              onChange={handleInputChange}
              color="secondary"
            >
              <MenuItem value="TEXT"> Text Area</MenuItem>
              <MenuItem value="RADIO">Single Options Select</MenuItem>
              <MenuItem value="CHECKBOX">Multiple Options Select</MenuItem>
              <MenuItem value="LIST">Rating</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={7}>
          <FormControl fullWidth>
            <FormLabel color="secondary">Mode</FormLabel>
            <RadioGroup
              aria-labelledby="mode-radio-buttons-group-label"
              name="currentMode"
              value={values.currentMode}
              onChange={handleRadioButtonChange}
              color="secondary"
              row
            >
              {MODES.map((mode, i) => (
                <FormControlLabel
                  value={mode}
                  control={<Radio color="secondary" />}
                  label={mode}
                  sx={{ textTransform: "capitalize" }}
                  key={i}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Step1;
