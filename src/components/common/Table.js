// import react from "react";
// import {
//   Paper,
//   TableContainer,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   Button
// } from "@mui/material";

// const BaseTable = (tableheaders , data, tablebodies) => {

//     const ButtonIcon = prop => {
//         return (
//           <Button
//             to={prop.link}
//             variant="contained"
//             type="button"
//             size="small"
//             className={"button-classes"}
//             startIcon={prop.icon}
//           />
//         );
//       };

//       console.log("tableheaders:", tableheaders);

//   return (
//     <div>
//       <Paper>
//         <TableContainer>
//           <Table sx={{ minWidth: 650 }}>
//             <TableHead>
//               <TableRow>
//                 {tableheaders && tableheaders.map((header,i) => (
//                 <TableCell key={i}>{header}</TableCell>
//                 ))}
//                 DK
//               </TableRow>
//             </TableHead>
//             <TableBody>
//                 {data.map(data => (
//               <TableRow key={data.id}>
//               {tablebodies.map(content => typeof content === "string" ?(
//                 <TableCell key={content}>1</TableCell>
//                 ): (
//                     <TableCell key={content}><ButtonIcon link={content.base} icon={content.icon}/></TableCell>
//                 ))}
//               </TableRow>
//               ))}
//               Dinesh
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Paper>
//     </div>
//   );
// };

// export default BaseTable;
import React from 'react'
import {
      Paper,
      TableContainer,
      Table,
      TableHead,
      TableRow,
      TableCell,
      TableBody,
      Button
    } from "@mui/material";
    // import makeStyles from '@mui/material';

    // const useStyles = makeStyles({
    //     root: {
    //       width: "100%"
    //     },
    //     container: {
    //       maxHeight: 440
    //     }
    //   });
      
      const getProperty = (obj, prop) => {
        var parts = prop.split(".");
      
        if (Array.isArray(parts)) {
          var last = parts.length > 1 ? parts.pop() : parts;
          var l = parts.length,
            i = 1,
            current = parts[0];
      
          while ((obj = obj[current]) && i < l) {
            current = parts[i];
            i++;
          }
      
          if (typeof obj === "object") {
            return obj[last];
          }
          return obj;
        } else {
          throw "parts is not valid array";
        }
      };
      
      const ButtonLink = (prop) => {
        return (
          <Button
            to={prop.link}
            variant="contained"
            type="button"
            size="small"
            className={"button-classes"}
            startIcon={prop.icon}
          />
        );
      };
export const BaseTable = ({ data, tableHeaders, tableBodies }) => {
    // const classes = useStyles();
  return (
    <Paper>
    <TableContainer >
      <Table stickyHeader aria-label="sticky table" sx={{ minWidth: 1020 }}>
        <TableHead>
          <TableRow>
            {tableHeaders.map((header, index) => (
              <TableCell key={index}>{header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((data,j) => (
            <TableRow key={j}>
              {tableBodies.map((body) =>
                typeof body === "string" ? (
                  <TableCell key={body}>{getProperty(data, body)}</TableCell>
                ) : (
                  <TableCell key={body}>
                    <ButtonLink link={body.base} icon={body.icon} />
                  </TableCell>
                )
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Paper>
  )
}
