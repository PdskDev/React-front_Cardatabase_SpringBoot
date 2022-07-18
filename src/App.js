import './App.css';
import { AppBar, Toolbar } from '@mui/material';
import Typography from '@mui/material/Typography';
import ListCars from './components/ListCars';

function App() {
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Carshop</Typography>
        </Toolbar>
      </AppBar>
      <ListCars />
    </div>
  );
}

export default App;
