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

    save(){
        const task = this.state.task
        const method = task.id ? "put" : "post"
        const url = task.id ? `${baseUrl}/${task.id}` : baseUrl

        axios[method](url, task)
            .then(resp => {
                const list = this.getUpdatedList(resp.data)
                this.setState({task:initialState.task})
            })
    }

    getUpdatedList(task){
        const list = this.state.list.filter(t => t.id !== task.id)
        list.unshift(task)
        return list
    }

    updateField(event){
        const task = {...this.state.task}
       task[event.taget.name] = event.target.value
       this.setState({task})

    }

    render() {
        return (
            <Main {... headerProps}>
                Cadastro de Task
            </Main>
        )
    }
}