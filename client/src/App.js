import React from 'react'
import Header from "./components/Header";
import Routes from './router/Routes';


function App() {

  return (
    <div className="ui container">
      <Header />
      <Routes />
    </div>
  );
}

export default App;
