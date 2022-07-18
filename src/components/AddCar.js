import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

function AddCar(props) {
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
    props.addCar(car);
    handleClose();
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        New Car
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Car</DialogTitle>
        <DialogContent>
          <input
            placeholder="Brand"
            name="brand"
            value={car.brand}
            onChange={handleChange}
          />
          <br />
          <input
            placeholder="Model"
            name="model"
            value={car.model}
            onChange={handleChange}
          />
          <br />
          <input
            placeholder="Color"
            name="color"
            value={car.color}
            onChange={handleChange}
          />
          <br />
          <input
            placeholder="Year"
            name="year"
            value={car.buildYear}
            onChange={handleChange}
          />
          <br />
          <input
            placeholder="Register Number"
            name="registerNumber"
            value={car.registerNumber}
            onChange={handleChange}
          />
          <br />
          <input
            placeholder="Price"
            name="price"
            value={car.price}
            onChange={handleChange}
          />
          <br />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="outlined" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddCar;
