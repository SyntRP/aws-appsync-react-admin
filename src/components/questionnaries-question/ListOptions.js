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
import AutoCompleteSelect from "../reusable/AutoComplete";

const ListOptions = ({
  listItem,
  setListItem,
  options,
  handleAddingListItem,
  listItemOptions,
  showNextQuestion,
  getQuestionById,
}) => (
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
          </TableRow>
        </TableHead>
        <TableBody>
          {listItemOptions.map((item, i) => (
            <TableRow key={i}>
              <TableCell>{item?.listValue}</TableCell>
              {showNextQuestion && (
                <TableCell>{getQuestionById(item?.nextQuestion)}</TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )}
  </Grid>
);
export default ListOptions;
