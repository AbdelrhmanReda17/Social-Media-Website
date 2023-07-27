import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="navbar">
            <div className="links">
                <Link to="/"> Home </Link>
                <Link to="/login"> Login </Link>
            </div>
            {/* <div className="user">
                <>
                    <p> Abdelrhman R.Muhammed</p>
                    <img src="AR.jpg" width="30" height="30" alt="AR" />
                    <button className="LogoutBtn" onClick={() => { }}> Log Out</button>
                </>
            </div> */}
        </div>
    );
};

export default Navbar;