import React, { useContext, useRef, useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { UserContext } from '../App'
import M from 'materialize-css'
import './Navbar.css'




export const Navbar = () => {

    const [search, setSearch] = useState("");
    const [userDetails, setUserDetails] = useState([]);
    const searchModal = useRef(null);
    const history = useHistory();
    const { state, dispatch } = useContext(UserContext);

    useEffect(() => {
        M.Modal.init(searchModal.current);
    }, []);

    const renderList = () => {
        if (state) {
            return [
                <ul className="nav_lists">

                    ,
                <li>
                        <Link to="/">
                            <i style={{ marginTop: "-1px" }} className="large material-icons">
                                home
                    </i>
                        </Link>
                    </li>
                ,
                <li>
                        <Link to="/createpost">
                            <i className="large material-icons">create</i>
                        </Link>
                    </li>
                ,
                <li>
                        <img
                            style={{ height: "25px", width: "25px", marginTop: "15px", cursor: "pointer" }}
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRmILJ36vyWg9lmCEFlaqXOVis0lmWxRCO-Ag&usqp=CAU"
                            onClick={() => {
                                localStorage.clear();
                                dispatch({ type: "CLEAR" });
                                history.push("/signin");
                            }}
                        ></img>
                    </li>
                ,
              </ul>,
            ]
        }
        else {
            return [
                <li key={5}><Link to="/home">Home</Link></li>,
                <li key={3}><Link to="/signin">Signin</Link></li>,
                <li key={4}><Link to="/signup">Signup</Link></li>

            ]

        }
    }

    const fetchUsers = (query) => {
        setSearch(query);
        fetch("/search-users", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                query,
            }),
        })
            .then((res) => res.json())
            .then((results) => {
                setUserDetails(results.user);
            });
    };

    return (
        <div className="row">
            <nav className="navbar-fixed">
                <div className="nav-wrapper white">

                    <ul id="nav-mobile" className="right ">
                        {renderList()}
                    </ul>

                </div>
            </nav>
            <div
                id="modal1"
                className="modal"
                ref={searchModal}
                style={{ color: "black" }}
            >
                <div className="modal-content">
                    <h4>Search..</h4>
                    <input
                        type="text"
                        placeholder="name or email"
                        value={search}
                        onChange={(e) => fetchUsers(e.target.value)}
                    />
                    <ul className="collection">
                        {userDetails.map((item) => {
                            return (
                                <Link
                                    to={
                                        item._id !== state._id
                                            ? "/profile/" + item._id
                                            : "/profile"
                                    }
                                    onClick={() => {
                                        M.Modal.getInstance(searchModal.current).close();
                                        setSearch("");
                                    }}
                                >
                                    <li className="collection-item" style={{ width: "100%" }}>
                                        {item.email}
                                    </li>
                                </Link>
                            );
                        })}
                    </ul>
                </div>
                <div className="modal-footer">
                    <button
                        className="modal-close waves-effect waves-green btn-flat"
                        onClick={() => setSearch("")}
                    >
                        close
            </button>
                </div>
            </div>

        </div>
    )
}
export default Navbar
