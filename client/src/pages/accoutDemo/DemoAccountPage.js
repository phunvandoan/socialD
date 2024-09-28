import { useCallback, useContext, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { AuthContext } from "../../context/AuthContext";
import { loginCall } from "../../apiCall";
import SignUpAndIn from "../../components/signUpAndIn/SignUpAndIn";

function Login() {
  const { isFetching, dispatch } = useContext(AuthContext);
  const [option, setOption] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = useCallback(
    (e) => {
      e.preventDefault();

      loginCall({ email, password }, dispatch);
    },
    [dispatch, email, password]
  );

  useMemo(() => {
    switch (option) {
      case "admin":
        setEmail("CodeCuaDoan@gmail.com");
        setPassword("CodeCuaDoan123456");
        console.log({ email, password });
        break;
      case "user":
        setEmail("Luffy@gmail.com");
        setPassword("Luffy@gmail.com");
        console.log({ email, password });
        break;
      default:
        break;
    }
  }, [option, email, password]);

  return (
    <SignUpAndIn>
      <form className="loginBox" onSubmit={handleClick} method="POST">
        <button
          className="loginRegisterButton"
          type="submit"
          disabled={isFetching}
          onClick={() => setOption("admin")}
        >
          {isFetching ? (
            <CircularProgress color="inherit" size="20px"></CircularProgress>
          ) : (
            "Admin"
          )}
        </button>
        <button
          className="loginRegisterButton"
          type="submit"
          disabled={isFetching}
          onClick={() => setOption("user")}
        >
          {isFetching ? (
            <CircularProgress color="inherit" size="20px"></CircularProgress>
          ) : (
            "User"
          )}
        </button>

        <Link
          to="/register"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textDecoration: "none",
          }}
        >
          <button className="loginRegisterButton">Create Account</button>
        </Link>

        <Link
          to="/login"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textDecoration: "none",
          }}
        >
          <button className="loginRegisterButton">Login</button>
        </Link>
      </form>
    </SignUpAndIn>
  );
}

export default Login;
