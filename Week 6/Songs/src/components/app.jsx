import { Link } from "react-router-dom";
import Home from "./home";

export default function App() {
  return (
    <>
      <h1>Main Page (Week 6 Seminar Tasks) </h1>
      <h1>Welcome to HitTastic! (Task 1)</h1>
      <Link to="/searchbyartist">1- Go to Search By Artiist Page (Task 2)</Link>
      <br></br>
      <Link to="/addsong">2- Go to Add Song Page (Task 3)</Link>
      <br></br>
      <Link to="/buy">3- Buy Song Page (Task 4)</Link>
      <br></br>
      <Link to="/searchbyartist2">4- Another Search By Artist (Task 4)</Link>
      <br></br>
      <Link to="/buy2">5- Buy Song Page with Hidden Form (Task 5 Todo)</Link>
      <br></br>
      <Link to="/dashboard">6- Dynamic Routing (Advanced Todo)</Link>
      <Home />
    </>
  );
}
