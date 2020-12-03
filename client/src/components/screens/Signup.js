import React, { useState } from 'react'
import { useHistory, Link } from 'react-router-dom';
import M from "materialize-css"

export const Signup = () => {


    const history = useHistory();
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");

    const PostData = () => {
        if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
            M.toast({ html: "Invalid Email", classes: "#c62828 red darken-3" });
            return;
        }
        fetch("/signup", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                password
            })
        }).then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.error) {
                    M.toast({ html: data.error, classes: "red darken-1" })
                }
                else {
                    M.toast({ html: data.message, classes: "green darken-2" })
                    history.push('/signin')
                }
            }).catch(err => {
                console.log(err)
            })

    }


    return (
        <div className="mycard" style={{ marginTop: "120px" }}>
            <div className="card auth-card">
                <h2>Share Posts</h2>
                <input
                    type="text"
                    placeholder="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    className="btn waves-effect waves-light"
                    onClick={() => PostData()}
                >
                    Login
        </button>
                <h6>
                    <Link to="/signin">Already have an account?</Link>
                </h6>
            </div>
        </div>


    )
}
export default Signup
