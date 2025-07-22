import { Link } from "react-router-dom";
import MyButton from "../button/MyButton";
import { useContext } from "react";
import { AuthContext } from "../../../context";

import cl from "./Navbar.module.css";
const Navbar = () => {
  const { isAuth, setIsAuth } = useContext(AuthContext);
  const logout = () => {
    setIsAuth(false);
    localStorage.removeItem("auth");
  };
  return (
    <div className={cl.navbar}>
      <MyButton onClick={logout}>Logout</MyButton>
      <div className={cl.navbar__links}>
        <Link to="/about">About</Link>

        <Link to="/posts">Posts page</Link>
      </div>
    </div>
  );
};

export default Navbar;
