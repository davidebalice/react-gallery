import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const NotAuth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = false;

    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="container fluid">
      <div
        className="row justify-content-center align-items-center jumbotron w-100"
        style={{ height: "65vh" }}
      >
        <p className="notAuth">
          User not authenticated
          <br />
          <Link className="dropdown-item singIn" to="/login">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default NotAuth;
