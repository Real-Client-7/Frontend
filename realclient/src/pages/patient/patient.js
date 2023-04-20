import React, { useState, useEffect } from "react";
import ConfirmationPopup from "../../components/confirmationPopup/confirmationPopup";
import axios from "axios";
import MUIDataTable from "mui-datatables";
import debounce from "lodash/debounce";
import { Box } from "@mui/system";
import Loader from "../../components/loader/loader";
import Cookies from "js-cookie";
import AppRegistrationSharpIcon from "@mui/icons-material/AppRegistrationSharp";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import SaveAsRoundedIcon from "@mui/icons-material/SaveAsRounded";

import LibraryAddRoundedIcon from "@mui/icons-material/LibraryAddRounded";
function createData(id, name, about, created_at, updated_at) {
  return {
    id,
    name,
    about,
    created_at,
    updated_at,
  };
}

function Patient(props) {
  const [Loading, setLoading] = useState(true);
  const [Data, setData] = useState([]);
  const [editingRow, setEditingRow] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setLoading(true);
    document.title = "Patients";
    getData();
  }, []);

  function openPatientPopup() {
    document.querySelector(".patient-popup").showModal();
  }
  const rows =
    Data ||
    [].map((item) =>
      createData(
        item.first_name,
        item.middle_name,
        item.last_name,
        item.email,
        item.mobile,
        item.dob,
        item.gender,
        item.maritalStatus,
        item.occupation,
        item.address,
        item.referredBY,
        item.notes,
        item.medicalStatus,
        item.appointments,
        item.created_at,
        item.updated_at
      )
    );

  const handleSearch = debounce((searchValue) => {
    console.log(searchValue);
  }, 500);

  const handleDelete = (rowsDeleted) => {
    const token = Cookies.get("token");
    axios
      .delete(`http://127.0.0.1:8000/patient/deletePatient/:id/${rowsDeleted}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })
      .then((response) => {
        getData();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getData = () => {
    const token = Cookies.get("token");
    axios
      .get("http://127.0.0.1:8000/patient/getAllPatients", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })
      .then((response) => {
        setData(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  const handleUpdate = (rowData) => {
    setEditingRow(true);
    const token = Cookies.get("token");
    axios
      .patch(
        `http://127.0.0.1:8000/patient/editPatient/:id/${rowData[0]}`,
        {
          first_name: rowData[1],
          middle_name: rowData[2],
          last_name: rowData[3],
          email: rowData[4],
          mobile: rowData[5],
          dob: rowData[6],
          gender: rowData[7],
          maritalStatus: rowData[8],
          occupation: rowData[9],
          referredBY: rowData[10],
          notes: rowData[11],
          medicalStatus: rowData[12],
          appointments: rowData[13],

        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      )
      .then((response) => {
        getData();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const showConfirmationBox = () => {
    document.querySelector(".confirmation-popup").showModal();
  };

  const showEditBox = () => {
    document.querySelector(".edit-popup").showModal();
  };

  const columns = [
    {
      name: "id",
      label: "ID",
      options: {
        display: "excluded",
      },
    },
    {
      name: "first_name",
      label: "First Name",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const rowIndex = tableMeta.rowIndex;
          const isEditing = rowIndex === editingRow;

          return (
            <div style={{ textAlign: "center" }}>
              {isEditing ? (
                <input
                  className="EditInput"
                  value={value}
                  onChange={(e) => {
                    updateValue(e.target.value);
                  }}
                />
              ) : (
                value
              )}
            </div>
          );
        },
        editable: true,
      },
    },
    {
      name: "last_name",
      label: "Last Name",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const rowIndex = tableMeta.rowIndex;
          const isEditing = rowIndex === editingRow;

          return (
            <div style={{ textAlign: "center" }}>
              {isEditing ? (
                <input
                  className="EditInput"
                  value={value}
                  onChange={(e) => {
                    updateValue(e.target.value);
                  }}
                />
              ) : (
                value
              )}
            </div>
          );
        },
        editable: true,
      },
    },{
      name: "mobile",
      label: "Mobile",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const rowIndex = tableMeta.rowIndex;
          const isEditing = rowIndex === editingRow;

          return (
            <div style={{ textAlign: "center" }}>
              {isEditing ? (
                <input
                  className="EditInput"
                  value={value}
                  onChange={(e) => {
                    updateValue(e.target.value);
                  }}
                />
              ) : (
                value
              )}
            </div>
          );
        },
        editable: true,
      },
    },

    {
      name: "created_at",
      label: "Created At",
    },
    {
      name: "updated_at",
      label: "Updated At",
    },
    {
      name: "actions",
      label: "Actions",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const rowData = tableMeta.rowData;
          const id = rowData[0];
          return (
            <>
              {isEditing && editingRow === tableMeta.rowIndex ? (
                <SaveAsRoundedIcon
                  sx={{
                    color: "#5cbdcb",
                    cursor: "pointer",
                    justifyItems: "center",
                    alignItems: "center",

                    "&:hover": {
                      transform: "scale(1.3)",
                      transition: "0.2s ease-out",
                    },
                  }}
                  className="save-btn"
                  onClick={() => {
                    setIsEditing(false);
                    setEditingRow(null);
                    handleUpdate(rowData);
                    showEditBox();
                  }}
                />
              ) : (
                <AppRegistrationSharpIcon
                  sx={{
                    color: "#5cbdcb",
                    cursor: "pointer",
                    justifyItems: "center",
                    alignItems: "center",

                    "&:hover": {
                      transform: "scale(1.3)",
                      transition: "0.2s ease-out",
                    },
                  }}
                  className="edit-btn"
                  onClick={() => {
                    setIsEditing(true);
                    setEditingRow(tableMeta.rowIndex);
                  }}
                />
              )}
              &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
              <DeleteRoundedIcon
                sx={{
                  color: "#5cbdcb",
                  cursor: "pointer",
                  justifyItems: "center",
                  alignItems: "center",

                  "&:hover": {
                    transform: "scale(1.3)",
                    transition: "0.2s ease-out",
                  },
                }}
                className="delete-btn"
                onClick={() => {
                  setDeleteId(rowData[0]);
                  showConfirmationBox();
                }}
              />
            </>
          );
        },
      },
    },
  ];

  const options = {
    filterType: "checkbox",
    responsive: "simple",
    selectableRows: "none",
    search: true,
    searchPlaceholder: "Search for Patient",
    onSearchChange: (searchValue) => handleSearch(searchValue),
    download: true,
    print: true,
    pagination: true,
    rowsPerPage: 5,
    loaded: true,
    rowsPerPageOptions: [5],
    onCellClick: (cellData, cellMeta) => {
      const rowIndex = cellMeta.rowIndex;
      if (cellMeta.colIndex === 3) {
        setEditingRow(rowIndex);
      }
    },
    onRowsDelete: handleDelete,
    fullScreen: true,
  };
  return (
    <>
      {Loading ? (
        <div>
          <Loader />
        </div>
      ) : (
        <div>
          <Box sx={{ maxWidth: "75%", margin: "auto" }}>
            <MUIDataTable
              title={
                <div>
                  <LibraryAddRoundedIcon
                    sx={{
                      color: "#5cbdcb",
                      cursor: "pointer",
                      justifyItems: "center",
                      alignItems: "center",

                      "&:hover": {
                        transition: "0.2s ease-out",
                      },
                    }}
                    className="addpatient"
                    onClick={openPatientPopup}
                  />{" "}
                  <span className="Patienttitle">Patient</span>
                </div>
              }
              data={rows}
              columns={columns}
              options={options}
              sx={{
                width: "70%",
                marginLeft: "390px",
                marginY: "190px",
                zIndex: 1,
                textAlign: "center",
              }}
            />

            <ConfirmationPopup handleDelete={handleDelete} id={deleteId} />
            <showEditBox handleUpdate={handleUpdate} id={editingRow} />
          </Box>
        </div>
      )}
    </>
  );
}
export default Patient;
