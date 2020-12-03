import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from "../../App";
import { Link, Redirect, useHistory } from "react-router-dom";
import '../../App.css'

export const Demohome = () => {
    const [data, setData] = useState([])
    const { state, dispatch } = useContext(UserContext);
    const history = useHistory()
    useEffect(() => {
        fetch('/allpostview', {

        }).then(res => res.json())
            .then(result => {
                console.log(result)
                setData(result.posts)
            })

    }, [])


    return (


        <div className="home" style={{ marginTop: "70px" }}>
            {
                data.map(item => {
                    return (
                        <div className="card home-card" key={item._id}>
                            <h5>
                                <h5

                                    style={{ padding: "7px", marginLeft: "20px" }}
                                >
                                    {item.postedBy.name}
                                </h5>
                                <hr />



                            </h5>
                            <Link to={`/comments/${item._id}`} > <h6 style={{ marginLeft: "30px" }}>{item.title}</h6></Link>
                            <Link to={`/comments/${item._id}`} > <p style={{ marginLeft: "30px" }}>{item.body}</p></Link>
                            <div className="card-content">



                                <i
                                    className="material-icons"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => { window.prompt(" oopsss!!!! you are not logged in.you can not like post") }}

                                >
                                    thumb_up
                                    </i>


                                <i
                                    className="material-icons"
                                    style={{ cursor: "pointer", marginLeft: "60px" }}
                                    onClick={() => history.push(`/comments/${item._id}`)}
                                >
                                    comment
                                                </i>
                                <h6 style={{ display: "flex" }}>{item.likes.length} likes
                                           <p style={{ marginLeft: "37px" }}> {item.comments.length} comments</p></h6>
                                {

                                }

                                <Link style={{ display: "flex", float: "right", }} to={`/comments/${item._id}`}>
                                    view all comments
                                        </Link>




                            </div>

                        </div>

                    )

                })
            }


        </div>



    )
}
