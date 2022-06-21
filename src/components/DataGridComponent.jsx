import {
  Box,
  Button,
  Container,
  Paper,
  TableContainer,
  Typography,
} from "@mui/material";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  gridClasses,
  GridToolbar,
} from "@mui/x-data-grid";
import React from "react";

const DataGridComponent = ({ title, buttonTitle, columns, rows, onClick }) => {
  function CustomToolbar() {
    return (
      <GridToolbarContainer
        className={gridClasses.toolbarContainer}
      ></GridToolbarContainer>
    );
  }

  return (
    <>
      <Container
        sx={{
          pt: 10,
        }}
        style={{ height: "90vh" }}
      >
        <>
          <Typography variant="h5" component="h2">
            {title}
          </Typography>

          {buttonTitle && (
            <Button
              variant="contained"
              sx={{
                m: 2,
              }}
              onClick={onClick}
              color="primary"
            >
              {buttonTitle}
            </Button>
          )}
        </>

        {
          <TableContainer
            draggable={true}
            style={{ height: "90vh" }}
            sx={{
              width: "100%",
            }}
            component={Paper}
          >
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={7}
              getRowId={(row) => row.name || row.checkIn}
              disableSelectionOnClick
              components={{
                Toolbar: GridToolbar,
              }}
            />
            
          </TableContainer>
        }
      </Container>
    </>
  );
};

export default DataGridComponent;
