import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../components/home/Home";
import TaskCrud from "../components/task/TaskCrud";

export default props =>  (
    <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route path="/createtask" element={<TaskCrud/>}/>
    </Routes>
)