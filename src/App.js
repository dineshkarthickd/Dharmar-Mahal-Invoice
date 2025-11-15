import React, { useState } from 'react';
import Login from './components/Login';
import InvoiceForm from './components/InvoiceForm';
import './styles/App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (status) => {
    setIsLoggedIn(status);
  };

  return (
    <div className="App">
      {!isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <InvoiceForm />
      )}
    </div>
  );
}

export default App;