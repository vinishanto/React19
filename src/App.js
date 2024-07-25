import logo from "./logo.svg";
import "./App.css";
import UserList from "./application/UserList";
import AddUser from "./application/AddUser";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Contact Us</p>
        <AddUser />
      </header>
    </div>
  );
}

export default App;
