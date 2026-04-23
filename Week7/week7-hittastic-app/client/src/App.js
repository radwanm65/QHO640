import { Routes, Route } from "react-router-dom";
import SongList from "./components/SongList";
import AddSong from "./components/AddSong";
import SearchForm from "./components/SearchForm";

function App() {
  return (
    <div>
      <h1>HitTastic!</h1>
      <AddSong />
      <SearchForm />
      <SongList />
    </div>
  );
}

export default App;
