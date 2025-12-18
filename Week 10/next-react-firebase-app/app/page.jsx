//Using Better-Sqlite and wadsongs.db file

import SearchForm from "./search/SearchForm";
import SearchResults from "./search/SearchResults";

// Using Firebase and Firestore

import AuthExample from "./components/AuthExample";
import CrudExample from "./components/CrudExample";

export default async function Page({ searchParams }) {
  const { artist } = await searchParams;
  return (
    <div className="container text-center mt-5">
      <h1>Searching for {artist} Using Better-Sqlite3</h1>
      <SearchForm />
      <SearchResults artist={artist} />

      <h1>User Login and Authentication using Firebase</h1>
      <AuthExample />
      <h1>CRUD Operations Example Using Firebase/Firestore</h1>

      <CrudExample />
    </div>
  );
}
