import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from "../../App";
import { Redirect, useHistory, useParams } from 'react-router-dom';



export const Comment = () => {
    const { postid } = useParams();
    const [data, setData] = useState([]);
    const [val, setVal] = useState([])
    const [com, setCom] = useState([]);
    const { state, dispatch } = useContext(UserContext);

    const userid = localStorage.getItem('jwt');

    useEffect(() => {

        fetch(`/viewcomment/${postid}`, {
            method: "get",
            headers: {
                "Content-Type": "application/json",

            },

        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result.comments);
                setData(result.comments)
                setCom(result)


            });
    }, [val])
    const makeComment = (text, postId) => {
        if (!state._id) {
            window.prompt("you are not logged in..you can not make comments")
        }
        else {
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
                    const newData = val.map((item) => {
                        if (item._id == result._id) {
                            return result;
                        } else {
                            return item;
                        }
                    });
                    setVal(newData);
                    window.location.reload()
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }




    return (
        <div style={{ marginTop: "70px", padding: "10px" }}>
            <div className="card home-card" style={{ padding: "30px" }} >

                <h6 style={{ marginLeft: "7px", marginTop: "8px", fontWeight: "bold", }}> {com.title}</h6>
                <h6 style={{ marginLeft: "7px", marginTop: "8px", fontWeight: "bold", }}> {com.body}</h6><br />
                <hr />
                {
                    data.map((record) => {
                        return (
                            <div key={record._id}>

                                <div style={{ marginLeft: "7px", display: "flex" }} >

                                    <p style={{ fontWeight: "bold", }}> {record.postedBy.name}: </p>
                                    <p style={{ fontSize: "12px", marginTop: "17px" }}>{record.text}</p>
                                </div>


                            </div>
                        );
                    })
                }
                {
                    userid ?
                        <form
                            onSubmit={(e) => {

                                makeComment(e.target[0].value, postid);
                            }}
                        >

                            <input type="text" placeholder="add comment" />
                        </form>
                        :
                        <div>
                            Log in to comment
                    </div>

                }


            </div>
        </div>
    )
}

