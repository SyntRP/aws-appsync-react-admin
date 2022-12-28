import TextField from "@mui/material/TextField";
import { Grid } from "@mui/material";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const ResponsiveDateRangePicker = ({
  fromDate,
  setFromDate,
  endDate,
  setEndDate,
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Grid
        container
        spacing={3}
        mb={2}
        // textAlign="center"
        // justifyContent="center"
      >
        <Grid item xs={12} cm={6} maxWidth="350px">
          <DatePicker
            label="From"
            value={fromDate}
            maxDate={endDate ? endDate : undefined}
            onChange={(event) => {
              setFromDate(event?._d);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </Grid>
        <Grid item xs={12} cm={6} maxWidth="350px">
          <DatePicker
            label="To"
            value={endDate}
            minDate={fromDate ? fromDate : undefined}
            onChange={(event) => {
              setEndDate(event?._d);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
};

export default ResponsiveDateRangePicker;
