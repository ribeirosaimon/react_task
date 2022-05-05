import "./Nav.css"
import React from "react"
import { Link } from "react-router-dom"

export default props =>
<aside className="menu-area">

    <nav className="menu">
        <Link to="/">
            <i className="fa fa-home"></i> Lista Tasks
        </Link>
        <Link to="/createtask">
            <i className="fa fa-users"></i> Adicionar Task
        </Link>
    </nav>
</aside>