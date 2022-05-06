import React, {Component} from "react";
import axios from "axios"
import Main from "../template/Main";
import { Link } from "react-router-dom"

const headerProps = {
    icon:"users",
    title: "Tasks",
    subtitles: "Cadastro de Task: CRUD"

}

const baseUrl = "http://localhost:8080/task"

const initialState = {
    task: {name: "", description:""},
    list: []
}

export default class ListTask extends Component {

    state = {... initialState}

    clear() {
        this.setState({task: initialState.task})
    }

    componentDidMount(){
        axios(baseUrl).then(resp => 
            this.setState({list:resp.data}))
    }

    load(task){
        this.setState({task})
    }

    remove(task){
        axios.delete(`${baseUrl}/${task.id}`).then(resp =>{
            const list = this.getUpdatedList(task, false)
            this.setState({list})
        })
    }

    renderTable(){
        return (
            <table className="table mt-4 table-striped">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nome</th>
                        <th>Descrição</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    renderRows() {
        return this.state.list.map(task => {
            return (
                <tr key={task.id}>
                    <td>{task.id}</td>
                    <td>{task.name}</td>
                    <td>{task.description}</td>
                    <td>
                    <Link to={`/savetask/${task.id}`} >
                        <button className="btn btn-warning"
                            onClick={() => this.load(task)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                    </Link>
                        <button className="btn btn-danger ml-2"
                        onClick={() => this.remove(task)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }

    save(){
        const task = this.state.task
        const method = task.id ? "put" : "post"
        const url = task.id ? `${baseUrl}/${task.id}` : baseUrl

        axios[method](url, task)
            .then(resp => {
                const list = this.getUpdatedList(resp.data)
                this.setState({task:initialState.task, list})
            })
    }

    getUpdatedList(task, add=true){
        const list = this.state.list.filter(t => t.id !== task.id)
        if(add) list.unshift(task)
        return list
    }

    updateName(event){
        const task = {...this.state.task}
        task.name = event.target.value
        this.setState({task})
    }

    updateDescription(event){
        const task = {...this.state.task}
        task.description = event.target.value
        this.setState({task})
    }

    render() {
        return (
            <Main {... headerProps}>
                <Link to="/savetask" >
                    <button>
                        <i className="fa fa-users"></i> Adicionar Task
                    </button>
                </Link>
                {this.renderTable()}
            </Main>
        )
    }
}