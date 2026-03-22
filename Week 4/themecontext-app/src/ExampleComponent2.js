// ExampleComponent.js (with logout handling)
import useUser from "./useUser2";

const STORAGE_KEY = "auth_user";

export default function ExampleComponent() {
  const [userState, setUserState] = useUser();
  const { user, isAdmin, loading } = userState;

  const handleLogout = () => {
    // remove from localStorage
    localStorage.removeItem(STORAGE_KEY);

    // reset state
    setUserState({
      user: null,
      isAdmin: false,
      loading: false,
    });

    // optional: inform server
    fetch("/logout", { method: "POST", credentials: "include" });
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      {user ? (
        <>
          <p>Welcome, {user.username}</p>
          <p>{isAdmin ? "Admin" : "User"}</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <p>Not logged in</p>
      )}
    </div>
  );
}
