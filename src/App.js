import React from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import MyShifts from './components/MyShifts';
import AvailableShifts from './components/AvailableShifts';
import { ShiftsProvider } from './context/ShiftsContext';
import './styles.css'; 

const App = () => {
  return (
    <Router>
      <ShiftsProvider>
        <div className="container">
          <nav>
            <ul>
              <li>
                <NavLink
                  to="/my-shifts"
                  activeClassName="active-link"
                  style={{ color: 'lightblue' }}
                  activeStyle={{ color: 'darkblue' }}
                >
                  My Shifts
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/available-shifts"
                  activeClassName="active-link"
                  style={{ color: 'lightblue' }}
                  activeStyle={{ color: 'darkblue' }}
                >
                  Available Shifts
                </NavLink>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/my-shifts" element={<MyShifts />} />
            <Route path="/available-shifts" element={<AvailableShifts />} />
          </Routes>
        </div>
      </ShiftsProvider>
    </Router>
  );
};

export default App;
