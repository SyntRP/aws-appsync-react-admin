import { Box, Button, Grid, TextField } from "@mui/material";
import React from "react";
import useForm from "../../helpers/hooks/useForm";
const initialFormValues = {
    question: "",
    order: "",
  };
const CreateQuestion = ({ toggle }) => {
    const { values, handleInputChange } = useForm(initialFormValues);
    const enableButton = Boolean(values.question) && Boolean(values.order);
  return (
    <>
      <Box>
        <Grid container spacing={2} justifyContent="center" my={1}>
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
          <Grid item xs={12}>
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
        </Grid>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Button onClick={toggle} variant="text" color="info">
            Close
          </Button>
          {/* {!loading ? (
            <Button
              onClick={onClickCreate}
              variant="contained"
              color="primary"
              disabled={!enableButton}
            >
              Create
            </Button>
          ) : (
            <Button variant="contained" color="primary" disabled>
              Creating ....
            </Button>
          )} */}
        </Box>
      </Box>
    </>
  );
};

export default CreateQuestion;
