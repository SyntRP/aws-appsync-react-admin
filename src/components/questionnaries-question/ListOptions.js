import {
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import AutoCompleteSelect from "../reusable/AutoComplete";

const ListOptions = ({
  listItem,
  setListItem,
  options,
  handleAddingListItem,
  handleRemovingListItem,
  listItemOptions,
  showNextQuestion,
  getQuestionById,
}) => {
  return (
    <Grid container rowGap={3} columnGap={1} alignItems="center">
      <Grid item xs={12} md={4}>
        <TextField
          required
          id="list-item"
          label="List Item"
          value={listItem?.listValue}
          variant="standard"
          color="secondary"
          onChange={(e) =>
            setListItem({ ...listItem, listValue: e.target.value })
          }
          fullWidth
        />
      </Grid>
      {showNextQuestion && (
        <Grid item xs={12} md={6}>
          <AutoCompleteSelect
            handleAutoCompleteChange={(event, newValue) => {
              setListItem({ ...listItem, nextQuestion: newValue?.id });
            }}
            options={options}
            label="Next Question"
          />
        </Grid>
      )}
      <Grid item xs={12} md={1} textAlign="center">
        <Button
          variant="contained"
          color="secondary"
          onClick={handleAddingListItem}
          disabled={!listItem?.listValue}
        >
          Add
        </Button>
      </Grid>
      {listItemOptions?.length > 0 && (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Option</TableCell>
              {showNextQuestion && <TableCell>Next Question</TableCell>}
              <TableCell sx={{ textAlign: "center" }}>Remove</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listItemOptions.map((item, i) => (
              <TableRow key={i}>
                <TableCell>{item?.listValue}</TableCell>
                {showNextQuestion && (
                  <TableCell>{getQuestionById(item?.nextQuestion)}</TableCell>
                )}
                <TableCell sx={{ textAlign: "center" }}>
                  <Button
                    size="small"
                    onClick={() => handleRemovingListItem(item?.listValue)}
                  >
                    <HighlightOffOutlinedIcon color="error" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Grid>
  );
};
export default ListOptions;
