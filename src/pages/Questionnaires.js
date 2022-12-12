// import React from 'react'
// import BaseTable from '../components/common/Table'

// export const Questionnaires = () => {

    
// const data = [
//     {
//       id: 23,
//       order: {
//         owner: {
//           id: 5,
//           user: {
//             id: 4,
//             first_name: "John",
//             last_name: "Doe"
//           }
//         }
//       },
//       application_date: "2020-07-06"
//     },
//     {
//       id: 24,
//       order: {
//         owner: {
//           id: 5,
//           user: {
//             id: 4,
//             first_name: "Jane",
//             last_name: "Doe"
//           }
//         }
//       },
//       application_date: "2020-07-06"
//     }
//   ];
  
//   const tableheaders = ["ID", "First Name", "Last Name", "Options"];
  
//   const tablebodies = [
//     `id`,
//     `order.owner.user.first_name`,
//     `order.owner.user.last_name`,
//     {
//     //   base: "/user",
//     //   param: `id`,
//     //   icon: <VisibilityIcon />
//     }
//   ];
  
//   return (
//     <BaseTable
//         data={data}
//         tableheaders={tableheaders}
//         tablebodies={tablebodies}
//       />
//   )
// }
import React from 'react'
import { BaseTable } from '../components/common/Table'

export const Questionnaires = () => {

    const data = [
        {
          id: 23,
          order: {
            owner: {
              id: 5,
              user: {
                id: 4,
                first_name: "John",
                last_name: "Doe"
              }
            }
          },
          application_date: "2020-07-06"
        },
        {
          id: 24,
          order: {
            owner: {
              id: 5,
              user: {
                id: 4,
                first_name: "Jane",
                last_name: "Doe"
              }
            }
          },
          application_date: "2020-07-06"
        }
      ];
      
      const tableHeaders = ["Q.No", "Question", "Type", "List Options", "Manage","Delete" ];
      
      const tableBodies = [
        `id`,
        `order.owner.user.first_name`,
        `order.owner.user.last_name`,
        // {
        //   base: "/user",
        //   param: `id`,
        //   icon: <VisibilityIcon />
        // }
      ];
      
  return (
    <BaseTable
      data={data}
      tableHeaders={tableHeaders}
      tableBodies={tableBodies}
    />
  )
}
