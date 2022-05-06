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

const taskState = {
    task: {name: "", description:""},
    list: []
}

class SaveTask extends Component {

    state = {... taskState}

    clear() {
        this.setState({task: taskState.task})
    }

    componentDidMount(){
        axios(baseUrl).then(resp => {
            this.setState({list:resp.data})
        })
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

    save(){
        const task = this.state.task
        const method = task.id ? "put" : "post"
        const url = task.id ? `${baseUrl}/${task.id}` : baseUrl

        axios[method](url, task)
            .then(resp => {
                const list = this.getUpdatedList(resp.data)
                this.setState({task:taskState.task, list})
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
                <div className="col-12 d-flex justify-content-center mt-2">
                <Link to="/listtask" >
                    <button className="btn btn-primary" onClick={e => this.save(e)}>Salvar</button>
                </Link>
                <button className="btn btn-secundary ml-2" onClick={e => this.clear(e)}>Cancelar</button>
                </div>
            </div>
        </div>
    }

    render() {
        return (
            <Main {... headerProps}>
                {this.renderForm()}
            </Main>
        )
    }
}

export default SaveTask