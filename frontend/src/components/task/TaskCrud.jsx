import React, {Component} from "react";
import axios from "axios"
import Main from "../template/Main";


const headerProps = {
    icon:"users",
    title: "Tasks",
    subtitles: "Cadastro de Task: CRUD"

}

const baseUrl = "http://localhost:8080/tasks"

const initialState = {
    task: {name: "", description:""},
    list: []
}

export default class TaskCrud extends Component {

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
            const list = this.getUpdatedList(null)
            this.setState({list})
        })
    }

    renderTable(){
        return (
            <table className="table mt-4">
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
                        <button className="btn btn-warning"
                        onClick={() => this.load(task)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2"
                        onClick={() => this.delete(task)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>

            )
        } )
    }

    save(){
        const task = this.state.task
        const method = task.id ? "put" : "post"
        const url = task.id ? `${baseUrl}/${task.id}` : baseUrl

        axios[method](url, task)
            .then(resp => {
                const list = this.getUpdatedList(resp.data)
                this.setState({task:initialState.task})
            })
        this.getUpdatedList(task)

    }

    getUpdatedList(task){
        const list = this.state.list.filter(t => t.id !== task.id)
        if(task) list.unshift(task)
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

    renderForm(){
        return <div className="form">
            <div className="row">

                <div className="col-12 col-md-6">
                    <div className="form-group">
                        <label>Nome</label>
                        <input type="text"
                        className="form-control"
                        name="name"
                        value={this.state.task.name}
                        onChange={e => this.updateName(e)}
                        placeholder="Digite o nome"/>
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className="form-group">
                        <label>Descrição</label>
                        <input type="text"
                        className="form-control"
                        name="description"
                        value={this.state.task.description}
                        onChange={e => this.updateDescription(e)}
                        placeholder="Digite a descrição"/>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12 d-flex justify-content-end"></div>
                <button className="btn btn-primary" onClick={e => this.save(e)}>Salvar</button>
                <button className="btn btn-secundary ml-2" onClick={e => this.clear(e)}>Cancelar</button>
            </div>
        </div>
    }

    render() {
        return (
            <Main {... headerProps}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}