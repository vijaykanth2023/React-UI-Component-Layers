import React from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Header from "./layout/header/Header";
//import Sidebar from "./layout/sidebar/Sidebar";
function App() {
  return (
    <div className="App">
      <Header />
      <Dashboard />
    </div>
  );
}
export default App;
