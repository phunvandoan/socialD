import "./signUpAndIn.css";
function SignUpAndIn({ children }) {
  console.log("SignUpAndIn");
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">SocialD</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on SocialD.
          </span>
        </div>
        <div className="loginRight">{children}</div>
      </div>
    </div>
  );
}

export default SignUpAndIn;
