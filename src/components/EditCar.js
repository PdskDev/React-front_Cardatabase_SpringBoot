import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

function EditCar(props) {
  const [open, setOpen] = useState(false);
  const [car, setCar] = useState({
    brand: '',
    model: '',
    color: '',
    buildYear: '',
    price: '',
    registerNumber: '',
  });

  //Open the modal form
  const handleClickOpen = () => {
    setCar({
      brand: props.data.row.brand,
      model: props.data.row.model,
      color: props.data.row.color,
      buildYear: props.data.row.buildYear,
      price: props.data.row.price,
      registerNumber: props.data.row.registerNumber,
    });

    setOpen(true);
  };

  //Close the modal form
  const handleClose = () => {
    setOpen(false);
  };

  //handle change input values
  const handleChange = (event) => {
    setCar({ ...car, [event.target.name]: event.target.value });
  };

  //Save new car
  const handleSave = () => {
    props.updateCar(car, props.data.id);
    handleClose();
  };

  return (
    <div>
      <IconButton variant="outlined" onClick={handleClickOpen}>
        <EditIcon color="primary" />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <Box sx={{ width: 500 }}>
          <DialogTitle>Edit Car</DialogTitle>
          <DialogContent>
            <Stack spacing={2} mt={1}>
              <TextField
                label="Brand"
                name="brand"
                autoFocus
                variant="standard"
                value={car.brand}
                onChange={handleChange}
              />
              <TextField
                label="Model"
                name="model"
                autoFocus
                variant="standard"
                value={car.model}
                onChange={handleChange}
              />
              <TextField
                label="Color"
                name="color"
                autoFocus
                variant="standard"
                value={car.color}
                onChange={handleChange}
              />
              <TextField
                label="Year"
                name="buildYear"
                autoFocus
                variant="standard"
                value={car.buildYear}
                onChange={handleChange}
              />
              <TextField
                label="Register Number"
                name="registerNumber"
                autoFocus
                variant="standard"
                value={car.registerNumber}
                onChange={handleChange}
              />
              <TextField
                label="Price"
                name="price"
                autoFocus
                variant="standard"
                value={car.price}
                onChange={handleChange}
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="error" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={handleSave}>
              Save
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
}

export default EditCar;
