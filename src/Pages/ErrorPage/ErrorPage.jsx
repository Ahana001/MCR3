import "./ErrorPage.css";

import { Link } from "react-router-dom";

export function ErrorPage() {
  return (
    <div className="ErrorPageContainer">
      <h2>404 Page Not Found</h2>
      <Link to="/">Home</Link>
    </div>
  );
}
