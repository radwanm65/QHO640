// ExampleComponent.js
import useUser from "./useUser";

export default function ExampleComponent() {
  const [userState, setUserState] = useUser();
  const { user, isAdmin, loading } = userState;

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      {user ? (
        <>
          <p>Welcome, {user.username}</p>
          <p>Role: {isAdmin ? "Admin" : "User"}</p>

          <button
            onClick={() =>
              setUserState((prev) => ({
                ...prev,
                user: null,
                isAdmin: false,
              }))
            }
          >
            Logout (client-side)
          </button>
        </>
      ) : (
        <p>Not logged in</p>
      )}
    </div>
  );
}
