import React, { useEffect, useState } from 'react';
import { SERVER_URL } from '../constants';
import { DataGrid } from '@mui/x-data-grid';
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';
import AddCar from './AddCar';
import EditCar from './EditCar';

function ListCars() {
  const [cars, setCars] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchCars();
  }, []);

  //Fetch/List Cars
  const fetchCars = () => {
    fetch(SERVER_URL + 'api/cars')
      .then((response) => response.json())
      .then((data) => setCars(data._embedded.cars))
      .catch((err) => console.error(err));
  };

  //Delete a car
  const onDelClick = (url) => {
    if (window.confirm('Are you sure to delete ?')) {
      fetch(url, { method: 'DELETE' })
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
    fetch(SERVER_URL + 'api/cars', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
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
    fetch(link, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
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
        <Button variant="outlined" onClick={() => onDelClick(row.id)}>
          Delete
        </Button>
      ),
    },
  ];

  return (
    <React.Fragment>
      <AddCar addCar={addCar} />

      <div style={{ height: 500, width: '100%' }}>
        <DataGrid
          rows={cars}
          columns={columns}
          disableSelectionOnClick={true}
          getRowId={(row) => row._links.self.href}
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
