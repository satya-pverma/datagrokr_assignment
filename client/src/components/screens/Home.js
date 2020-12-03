import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from "../../App";
import { Link, useHistory } from "react-router-dom";
import '../../App.css'





export const Home = () => {
    const [data, setData] = useState([])
    const { state, dispatch } = useContext(UserContext);
    const history = useHistory()
    useEffect(() => {
        fetch('/allpost', {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
                console.log(result)
                setData(result.posts)
            })

    }, [])

    const likepost = (id, pic) => {
        fetch("/like", {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
            body: JSON.stringify({
                postId: id,
                photo: pic,
                postedBy: pic,
            }),
        })
            .then((res) => res.json())
            .then((result) => {
                // console.log(result)
                const newData = data.map((item) => {
                    if (item._id == result._id) {
                        return result;
                    } else {
                        return item;
                    }
                });
                setData(newData);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const unlikepost = (id, pic) => {
        fetch("/unlike", {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
            body: JSON.stringify({
                postId: id,
                photo: pic,
                postedBy: pic,
            }),
        })
            .then((res) => res.json())
            .then((result) => {
                // console.log(result)
                const newData = data.map((item) => {
                    if (item._id == result._id) {
                        return result;
                    } else {
                        return item;
                    }
                });
                setData(newData);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const makeComment = (text, postId) => {
        fetch("/comment", {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
            body: JSON.stringify({
                postId,
                text,
            }),
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                const newData = data.map((item) => {
                    if (item._id == result._id) {
                        return result;
                    } else {
                        return item;
                    }
                });
                setData(newData);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const deletePost = (postid) => {
        fetch(`/deletepost/${postid}`, {
            method: "delete",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                const newData = data.filter((item) => {
                    return item.id !== result._id;
                });
                setData(newData);
                window.location.reload(true);
            });
    }


    return (

        <>
            {
                data.length > 0 ?

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

                                            {item.postedBy._id == state._id && (

                                                <i
                                                    className="material-icons"
                                                    style={{ cursor: "pointer", float: "right", marginTop: "-40px" }}
                                                    onClick={() => deletePost(item._id)}
                                                >
                                                    delete
                                                </i>

                                            )}




                                        </h5>
                                        <Link to={`/comments/${item._id}`} >  <h6 style={{ marginLeft: "30px" }}>{item.title}</h6></Link>
                                        <Link to={`/comments/${item._id}`} > <p style={{ marginLeft: "30px" }}>{item.body}</p></Link>

                                        <div className="card-content">


                                            {item.likes.includes(state._id, state.photo) ? (
                                                <i
                                                    className="material-icons"
                                                    style={{ cursor: "pointer" }}
                                                    onClick={() => {
                                                        unlikepost(item._id);
                                                    }}
                                                >
                                                    thumb_down
                                                </i>
                                            ) : (
                                                    <i
                                                        className="material-icons"
                                                        style={{ cursor: "pointer" }}
                                                        onClick={() => {
                                                            likepost(item._id, item.photo);
                                                        }}
                                                    >
                                                        thumb_up
                                                    </i>
                                                )}




                                            <i
                                                className="material-icons"
                                                style={{ cursor: "pointer", marginLeft: "60px" }}
                                                onClick={() => history.push(`/comments/${item._id}`)}
                                            >
                                                comment
                                                    </i>
                                            {item.postedBy._id == state._id && (

                                                <i
                                                    className="material-icons"
                                                    style={{ cursor: "pointer", marginLeft: "110px" }}
                                                    onClick={() => history.push(`/edit/${item._id}`)}
                                                >
                                                    edit
                                                </i>

                                            )}

                                            <h6 style={{ display: "flex" }}>{item.likes.length} likes
                                               <p style={{ marginLeft: "37px" }}> {item.comments.length} comments</p>
                                                {item.postedBy._id == state._id && (

                                                    <p

                                                        style={{ cursor: "pointer", marginLeft: "45px" }}

                                                    >
                                                        edit
                                                    </p>

                                                )}
                                            </h6>



                                            <Link style={{ display: "flex", float: "right", }} to={`/comments/${item._id}`}>
                                                view all comments
                                            </Link>




                                        </div>
                                        <form style={{ width: "80%", marginLeft: "10%" }}
                                            onSubmit={(e) => {

                                                makeComment(e.target[0].value, item._id);
                                            }}
                                        >

                                            <input type="text" placeholder="add comment" />
                                        </form>

                                    </div>

                                )

                            })
                        }


                    </div>


                    :

                    <div className="preloader-wrapper big active" style={{ marginTop: "50px" }}>
                        <div className="spinner-layer spinner-blue-only">
                            <div className="circle-clipper left">
                                <div className="circle"></div>
                            </div>
                            <div className="gap-patch">
                                <div className="circle"></div>
                            </div>
                            <div className="circle-clipper right">
                                <div className="circle"></div>
                            </div>
                        </div>
                    </div>
            }

        </>



    )
}
export default Home
