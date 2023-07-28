import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/userAuthContext";

const Navbar = () => {
    const { user } = useAuthContext();
    const { logout } = useLogout();
    const handleClick = () =>{
        logout();
    }
    return (
        <header>
            <div className="navbar">
                <Link to="/">
                    <h1>Social Media </h1>
                </Link>
                <nav>
                    { user && <div className="User-Details">
                        <img className="user-Img" src={user.photoURL} width="50" height="50" alt="AR" />
                        <span>{ user.username }</span>
                        <button onClick={handleClick}>Log out</button>
                    </div> }
                    {!user && 
                    <div className="links">
                        <Link to="/login">Login</Link>
                        <Link to="/register">Signup</Link>
                    </div>}
                </nav>

                {/* <div className="user">
                    <>
                        <p> Abdelrhman R.Muhammed</p>
                        <img src="AR.jpg" width="30" height="30" alt="AR" />
                        <button className="LogoutBtn" onClick={() => { }}> Log Out</button>
                    </>
                </div> */}
            </div>
        </header>
    );
};

export default Navbar;