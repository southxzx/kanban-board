import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
import Nav from "./Nav";

const socket = io("http://localhost:4000");

const Comments = () => {

    const { category, id } = useParams();
    const [comment, setComment] = useState("");
    const [commentList, setCommentList] = useState([]);

    const addComment = (e) => {
        e.preventDefault();
        /*
        👇🏻 sends the comment, the task category, item's id and the userID.
         */
        socket.emit("addComment", {
            comment,
            category,
            id,
            userId: localStorage.getItem("userId"),
        });
        setComment("");
    };

    //👇🏻 Listens to the comments event
    useEffect(() => {
        socket.on("comments", (data) => setCommentList(data));
    }, []);

    useEffect(() => {
        socket.emit("fetchComments", { category, id });
    }, [category, id]);

    return (
        <div className='comments__container'>
            <Nav socket={socket} />
            <form className='comment__form' onSubmit={addComment}>
                <label htmlFor='comment'>Add a comment</label>
                <textarea
                    placeholder='Type your comment...'
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={5}
                    id='comment'
                    name='comment'
                    required
                ></textarea>
                <button className='commentBtn'>ADD COMMENT</button>
            </form>

            <div className='comments__section'>
                <h2>Existing Comments</h2>
                {commentList.map((comment) => (
                    <div key={comment.id}>
                        <p>
                            <span style={{ fontWeight: "bold" }}>{comment.text} </span>by{" "}
                            {comment.name}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Comments;