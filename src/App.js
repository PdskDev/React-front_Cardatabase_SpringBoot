import './App.css';
import { AppBar, Toolbar } from '@mui/material';
import Typography from '@mui/material/Typography';

import Login from './components/Login';

function App() {
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Carshop</Typography>
        </Toolbar>
      </AppBar>
      <Login />
    </div>
  );
}

export default App;
