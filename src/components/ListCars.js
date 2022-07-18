import React, { useEffect, useState } from 'react';
import { SERVER_URL } from '../constants';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  gridClasses,
} from '@mui/x-data-grid';
import Snackbar from '@mui/material/Snackbar';

import Stack from '@mui/material/Stack';
import AddCar from './AddCar';
import EditCar from './EditCar';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

function ListCars() {
  const [cars, setCars] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchCars();
  }, []);

  //Fetch/List Cars
  const fetchCars = () => {
    //get Jwt Token from session storage
    const token = sessionStorage.getItem('jwt');

    fetch(SERVER_URL + 'api/cars', {
      headers: { Authorization: token },
    })
      .then((response) => response.json())
      .then((data) => setCars(data._embedded.cars))
      .catch((err) => console.error(err));
  };

  //Delete a car
  const onDelClick = (url) => {
    if (window.confirm('Are you sure to delete ?')) {
      //get Jwt Token from session storage
      const token = sessionStorage.getItem('jwt');

      fetch(url, {
        method: 'DELETE',
        headers: { Authorization: token },
      })
        .then((response) => {
          if (response.ok) {
            fetchCars();
            setOpen(true);
          } else {
            alert('Something went wrong!');
          }
        })
        .catch((err) => console.error(err));
    }
  };

  //Add new car
  const addCar = (car) => {
    //get Jwt Token from session storage
    const token = sessionStorage.getItem('jwt');

    fetch(SERVER_URL + 'api/cars', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify(car),
    })
      .then((response) => {
        if (response.ok) {
          fetchCars();
        } else {
          alert('Something went wrong!');
        }
      })
      .catch((err) => console.error.apply(err));
  };

  //Update Car
  const updateCar = (car, link) => {
    //get Jwt Token from session storage
    const token = sessionStorage.getItem('jwt');
    fetch(link, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify(car),
    })
      .then((response) => {
        if (response.ok) {
          fetchCars();
        } else {
          alert('Something went wrong!');
        }
      })
      .catch((err) => console.error.apply(err));
  };

  //Datagrid column def
  const columns = [
    { field: 'brand', headerName: 'Brand', width: 200 },
    { field: 'model', headerName: 'Model', width: 200 },
    { field: 'color', headerName: 'Color', width: 200 },
    { field: 'buildYear', headerName: 'Year', width: 200 },
    { field: 'price', headerName: 'Price', width: 200 },
    {
      field: '_links.car.href',
      headerName: '',
      sortable: false,
      filterable: false,
      width: 100,
      renderCell: (row) => <EditCar data={row} updateCar={updateCar} />,
    },
    {
      field: '_links.self.href',
      headerName: '',
      sortable: false,
      filterable: false,
      width: 100,
      renderCell: (row) => (
        <IconButton onClick={() => onDelClick(row.id)}>
          <DeleteIcon color="error" />
        </IconButton>
      ),
    },
  ];

  function CustomToolBar() {
    return (
      <GridToolbarContainer className={gridClasses.toolbarContainer}>
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }

  return (
    <React.Fragment>
      <Stack mt={2} mb={2}>
        <AddCar addCar={addCar} />
      </Stack>

      <div style={{ height: 500, width: '100%' }}>
        <DataGrid
          rows={cars}
          columns={columns}
          disableSelectionOnClick={true}
          getRowId={(row) => row._links.self.href}
          components={{ Toolbar: CustomToolBar }}
        />
        <Snackbar
          open={open}
          autoHideDuration={2000}
          onClose={() => setOpen(false)}
          message="Car deleted"
        />
      </div>
    </React.Fragment>
  );
}

export default ListCars;
