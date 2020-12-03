import React, { useState, useEffect } from "react";
import M from "materialize-css";
import { useHistory, useParams } from "react-router-dom";

export const Edit = () => {
    const history = useHistory();
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [loader, setLoad]=useState(false);
    const { postid } = useParams();
    

    useEffect(() => {
      fetch(`/postdetails/${postid}`,{
          method:"get",
          headers:{
            "Content-Type": "application/json",
             "Authorization": "Bearer " + localStorage.getItem("jwt")            

          },
      })
      .then((res)=>res.json())
      .then((result)=>{
         // console.log(result.posts.title)
         // console.log(result.posts.body)
          setTitle(result.posts.title)
          setBody(result.posts.body)
      })
      .catch((err)=>{
          console.log(err)
      })
    }, [])

    const postDetails = () => {
       
            fetch(`/editpost/${postid}`, {
                method: "put",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                },
                body: JSON.stringify({
                    title,
                    body,
                   
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.error) {
                        M.toast({ html: data.error, classes: "#c62828 red darken-3" });
                    } else {
                        M.toast({
                            html: "edited successfull",
                            classes: "#43a047 green darken-1",
                        });

                        history.push("/");
                    }
                })
                .catch((err) => {
                    console.log(err);
                })
        

    }


    



       
    



    return (
        <div
            className="card input-filed"
            style={{
                margin: "70px auto",
                maxWidth: "500px",
                padding: "20px",
                textAlign: "center",
                marginTop: "150px",
            }}
        >
            <input
                type="text"
                placeholder="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                type="text"
                placeholder="Description"
                value={body}
                onChange={(e) => setBody(e.target.value)}
            />

            
            <button
                className="btn waves-effect waves-light #64b5f6 blue darken-1"
                onClick={() =>{ postDetails(); setLoad(true) }}
                
            >
                Update post
               
      </button>
      {
          loader?
          <div>
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
          </div>
          :
          <div></div>
          

      }
        </div>
    );
};

