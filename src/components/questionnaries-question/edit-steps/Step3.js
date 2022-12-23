import {
  Divider,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
const TYPEVALUES = {
  TEXT: "Text Area",
  RADIO: "Single Options Select",
  CHECKBOX: "Multiple Options Select",
  LIST: "Rating",
};
const Step3 = ({ values, getQuestionById }) => {
  const {
    question,
    currentMode,
    order,
    type,
    nexQuestionAU,
    listItemOptions,
    dependentQuestionOptionsAU,
    dependentQuestionAU,
  } = values;

  return (
    <Paper variant="outlined" sx={{ px: 3, py: 1.5, my: 1 }}>
      <Grid container alignItems="center">
        <GridItemWrapper>
          <GridItemText value={question} label="Question" />
        </GridItemWrapper>
        <Grid container alignItems="start">
          <GridItemWrapper xs={6} sm={3}>
            <GridItemText value={order} label="Order" indent={false} />
          </GridItemWrapper>
          <GridItemWrapper xs={6} sm={4}>
            <GridItemText value={currentMode} label="Mode" indent={false} />
          </GridItemWrapper>
          <GridItemWrapper xs={10} sm={5}>
            <GridItemText
              value={TYPEVALUES[type]}
              label="Type"
              indent={false}
            />
          </GridItemWrapper>
        </Grid>
      </Grid>
      <Divider sx={{ my: 1 }} />
      {currentMode === "normal" && listItemOptions?.length > 0 && (
        <Table>
          <TableHead>
            <TableRow
              sx={{
                borderBottom: "2px solid black",
                "& th": {
                  fontSize: "1.25rem",
                  color: "secondary.main",
                },
              }}
            >
              <TableCell>Option</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listItemOptions.map((item, i) => (
              <TableRow key={i}>
                <TableCell>{item?.listValue}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      {currentMode === "self" && (
        <>
          {(type === "RADIO" || type === "CHECKBOX") && (
            <Table>
              <TableHead>
                <TableRow
                  sx={{
                    borderBottom: "2px solid black",
                    "& th": {
                      fontSize: "1.25rem",
                      color: "secondary.main",
                    },
                  }}
                >
                  <TableCell>Option</TableCell>
                  {type === "RADIO" && <TableCell>Next Question</TableCell>}
                </TableRow>
              </TableHead>
              <TableBody>
                {listItemOptions.map((item, i) => (
                  <TableRow key={i}>
                    <TableCell>{item?.listValue}</TableCell>
                    {type === "RADIO" && (
                      <TableCell>
                        {getQuestionById(item?.nextQuestion)}
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
          {(type === "TEXT" || type === "CHECKBOX") && (
            <>
              <GridItemText
                value={nexQuestionAU?.label}
                label="Next Question"
              />
              <Divider sx={{ my: 1 }} />
            </>
          )}
        </>
      )}
      {currentMode === "dependent" && (
        <>
          {(type === "RADIO" || type === "CHECKBOX") && (
            <Table>
              <TableHead>
                <TableRow
                  sx={{
                    borderBottom: "2px solid black",
                    "& th": {
                      fontSize: "1.25rem",
                      color: "secondary.main",
                    },
                  }}
                >
                  <TableCell>List Option</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listItemOptions?.map((item, i) => (
                  <TableRow key={i}>
                    <TableCell>{item?.listValue}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
          <GridItemText
            label="Dependent Question"
            value={dependentQuestionAU?.label}
          />
          <Divider sx={{ my: 1 }} />
          <Table>
            <TableHead>
              <TableRow
                sx={{
                  borderBottom: "2px solid black",
                  "& th": {
                    fontSize: "1.25rem",
                    color: "secondary.main",
                  },
                }}
              >
                <TableCell>Dependent Option</TableCell>
                <TableCell>Next Question</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dependentQuestionOptionsAU.map((item, i) => (
                <TableRow key={i}>
                  <TableCell>{item?.dependentValue}</TableCell>
                  <TableCell>{item?.nextQuestion?.label}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}
    </Paper>
  );
};

export default Step3;

const GridItemText = ({ value, label, indent = true }) => (
  <>
    <Typography
      variant="h6"
      my={1}
      sx={{ textDecoration: "underline" }}
      color="secondary"
    >
      {label}
    </Typography>
    <Typography variant="body1" my={1} textTransform="capitalize">
      {value}
    </Typography>
  </>
);

const GridItemWrapper = ({ children, xs = 12, sm = 12 }) => (
  <Grid item xs={xs} sm={sm}>
    {children}
  </Grid>
);
