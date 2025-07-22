import MyButton from "../components/UI/button/MyButton";
import MyInput from "../components/UI/input/MyInput";
import { useContext } from "react";
import { AuthContext } from "../context";

const Login = () => {
  const { isAuth, setIsAuth } = useContext(AuthContext);
  const login = (event) => {
    event.preventDefault();
    setIsAuth(true);
    localStorage.setItem("auth", "true");
  };
  return (
    <div>
      <h1>Login User</h1>

      <form onSubmit={login}>
        <MyInput type="text" placeholder="Enter the name" />
        <MyInput type="password" placeholder="Enter the password" />
        <MyButton>Login</MyButton>
      </form>
    </div>
  );
};

export default Login;
