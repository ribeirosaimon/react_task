import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../components/home/Home";
import SaveTask from "../components/task/SaveTask";
import ListTask from "../components/task/ListTask";

export default props =>  (
    <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route path="/savetask/:id" element={<SaveTask/>}/>
        <Route path="/listtask" element={<ListTask/>}/>
    </Routes>
)