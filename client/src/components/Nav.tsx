import React from "react";
import Noti from "./Noti";

const Nav = ({ socket }) => {
    return (
        <nav className='navbar'>
            <h3>Team's todo list</h3>
            <Noti socket={socket}/>
        </nav>
    );
};
export default Nav;