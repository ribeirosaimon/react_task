import React, { useEffect, useState } from "react";
import axios from "axios"
import Main from "../template/Main";
import { Link, useParams } from "react-router-dom"

const headerProps = {
    icon:"users",
    title: "Tasks",
    subtitles: "Cadastro de Task: CRUD"
}

const baseUrl = "http://localhost:8080/api/task"
const taskState = {
    task: {name: "", description:""},
    list: []
}


function SaveTask() {
    const { id } = useParams();

    const [task, setTask] = useState(taskState.task);
    const [list, setList] = useState(taskState.list);
    function clear() {
        setTask(taskState.task);
        setList(taskState.list);
    }
    useEffect(() => {
        
        if(id) {
            console.log(id)
            console.log("ok")
            axios(`${baseUrl}/${id}`).then( resp => {
                const _task = { ...task }
                _task.id = id
                _task.name = resp.data.name
                _task.description = resp.data.description
                setTask(_task)
            })
        } else {
            axios(baseUrl).then(resp => {
                setList(resp.data);
            })
        }

    }, []);


    function save() {

        const method = task.id ? "put" : "post"
        const url = id ? `${baseUrl}/${id}` : baseUrl
        console.log(url)
        axios[method](url, task)
            .then(resp => {
                const list = getUpdatedList(resp.data)
                setTask(taskState.task);
                setList(list);
            })
    }

    function getUpdatedList(task, add = true) {
        const _list = list.filter(t => t.id !== task.id)
        if (add) _list.unshift(task)
        return _list
    }

    function updateName(event) {
        const _task = { ...task }
        _task.name = event.target.value
        setTask(_task);
    }

    function updateDescription(event) {
        const _task = { ...task }
        _task.description = event.target.value
        setTask(_task);
    }

    function renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Nome</label>
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                value={task.name}
                                onChange={e => updateName(e)}
                                placeholder="Digite o nome"
                            />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Descrição</label>
                            <input
                                type="text"
                                className="form-control"
                                name="description"
                                value={task.description}
                                onChange={e => updateDescription(e)}
                                placeholder="Digite a descrição"
                            />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 d-flex justify-content-center mt-2">
                        <Link to="/listtask" >
                            <button className="btn btn-primary" onClick={e => save(e)}>Salvar</button>
                        </Link>
                        <button className="btn btn-secundary ml-2" onClick={e => clear(e)}>Cancelar</button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <Main {...headerProps}>
            {renderForm()}
        </Main>
    );
}

export default SaveTask