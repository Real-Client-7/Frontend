import "./assistant.css";
import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Button from "@mui/material/Button";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
// import AddCircleIcon from "@mui/icons-material/AddCircle";

function Assistants() {
  const assistant = [
    {
      id: 1,
      name: "Assistants A",
      mobile: "81254",
      email: "ahmad@gmail.com",
      age: "22",
      schedule: "8:00am to 9:00am",
    },
    {
      id: 2,
      name: "Assistants B",
      mobile: "202320",
      email: "mazen@gmail.com",
      age: "22",
      schedule: "8:00am to 9:00am",
    },
    {
      id: 3,
      name: "Assistants C",
      mobile: "202325",
      email: "yahya@gmail.com",
      age: "22",
      schedule: "8:00am to 9:00am",
    },
    {
      id: 1,
      name: "Assistants A",
      mobile: "202315",
      email: "asaad@gmail.com",
      age: "22",
      schedule: "8:00am to 9:00am",
    },
    {
      id: 2,
      name: "Assistants B",
      mobile: "202320",
      email: "zahraa@gmail.com",
      age: "22",
      schedule: "8:00am to 9:00am",
    },
  ];

  return (
    <div className="container">
      <div>
        <h2 className="title">Assistants</h2>
      </div>
      <TableContainer component={Paper}>
        {/* <Button
          startIcon={<AddCircleIcon />}
          style={{
            fontSize: 12,
            backgroundColor: "#369fff",
            color: "white",
            left: 1150,
            marginBottom: "0.5%",
          }}
          size="large"
          // onClick={() => alert("You can now add a Assistants")}
          variant="contained"
        >
          Add
        </Button> */}

        <Table className="tableall" aria-label="assistant table">
          <TableHead>
            <TableRow>
              <TableCell className="MuiTableCell-head">
                Assistant Name
              </TableCell>
              <TableCell align="center" className="MuiTableCell-head">
                Mobile
              </TableCell>

              <TableCell align="center" className="MuiTableCell-head">
                Email
              </TableCell>
              <TableCell align="center" className="MuiTableCell-head">
                Age
              </TableCell>
              <TableCell align="center" className="MuiTableCell-head">
                Schedule
              </TableCell>
              <TableCell align="center" className="MuiTableCell-head">
                Edit
              </TableCell>
              <TableCell align="center" className="MuiTableCell-head">
                Delete
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {assistant.map((Assistants) => (
              <TableRow key={Assistants.id} className="MuiTableRow-root">
                <TableCell
                  component="th"
                  scope="row"
                  className="MuiTableCell-root"
                >
                  {Assistants.name}
                </TableCell>
                <TableCell align="center" className="MuiTableCell-root">
                  {Assistants.mobile}
                </TableCell>
                <TableCell align="center" className="MuiTableCell-root">
                  {Assistants.email}
                </TableCell>
                <TableCell align="center" className="MuiTableCell-root">
                  {Assistants.age}
                </TableCell>
                <TableCell align="center" className="MuiTableCell-root">
                  {Assistants.schedule}
                </TableCell>
                {/* <TableCell align="center" className="MuiTableCell-root">
                  <Button
                    sx={{
                      color: "#333",
                      "&:hover": { color: "darkblue" },
                    }}
                  >
                    Age
                  </Button>
                </TableCell> */}
                <TableCell align="center" className="MuiTableCell-root">
                  <Button
                    sx={{
                      color: "#1976d2",
                    }}
                  >
                    {<Edit />}
                  </Button>
                </TableCell>
                <TableCell align="center" className="MuiTableCell-root">
                  <Button
                    sx={{
                      color: "red",
                    }}
                  >
                    {<Delete />}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Assistants;
