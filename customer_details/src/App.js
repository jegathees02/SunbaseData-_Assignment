import './App.css';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import Login from './components/login';
import Signup from './components/signup';
import CustomerList from './components/customersList';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' Component={Login} />
          <Route path='/signup' Component={Signup} />
          <Route path='/customer' Component={CustomerList} />
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;