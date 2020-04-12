import React from 'react';
import './App.css';
import InventoryReadout from './components/InventoryReadout';
import MenuUi from './components/MenuUi'; 

function App() {
  return (
    <div className="App">
        <MenuUi/>
      <InventoryReadout />
    </div>
  );
}

export default App;
