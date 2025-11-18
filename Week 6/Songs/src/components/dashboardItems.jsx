import { Link, useParams } from "react-router-dom";

export default function DashboardItems() {
  const { id } = useParams();
  return (
    <>
      <h1>Dashbaord Items {id}</h1>
      <Link to={"/"}>
        <button>Go Back Home</button>
      </Link>
    </>
  );
}
