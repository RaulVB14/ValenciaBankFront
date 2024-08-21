import React from "react";
import { Link } from "react-router-dom";

const links = [
    {
        name: "Login",
        href: "/Login",
    },
    {
        name: "Register",
        href: "/Register",
    },
];


const NavBar = () => {
    return(
        <div>
            {links.map((x) => (
                <Link to={x.href}>{x.href}</Link>
            ))}
        </div>
    );
};
 

export default NavBar