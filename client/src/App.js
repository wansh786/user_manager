import logo from './logo.svg';
import './App.css';

import { Singup } from './pages/Singup';
import { Home } from './pages/Home';

function App() {
  return (
    <div className="App">
      <h1>All Post</h1>
      {/* <Singup/> */}
      <Home/>
    </div>
  );
}

export default App;
