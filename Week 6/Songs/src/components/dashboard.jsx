import { Link } from "react-router-dom";

export default function Dashboard() {
  const dashboardItems = [
    { id: 1, title: "May Profile" },
    { id: 2, title: "May Projects" },
    { id: 3, title: "May Teams" },
  ];
  return (
    <>
      <h1>Dashbaord Page</h1>
      <ul>
        {dashboardItems.map((item) => (
          <li key={item.id}>
            <Link to={`/dashboard/${item.id}`}>
              <h2>{item.title}</h2>
            </Link>
          </li>
        ))}
      </ul>
      <Link to={"/"}>
        <button>Go Back Home</button>
      </Link>
    </>
  );
}
