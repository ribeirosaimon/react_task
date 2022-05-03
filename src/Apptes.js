import React, {useState} from 'react';
import { Component } from 'react';
import axios from 'axios';

const api = axios.create({
  baseURL: "http://localhost:8080/api/",
})

class App extends Component {

  state = {
    tasks: [],
    id:"",
    name:"",
    description:""
  }

  constructor() {
    super();
    this.getTasks();
  }

  getTasks = async () => {
    try{
      let data = await api.get("/task").then(({data}) => data);
      this.setState({tasks:data})
    } catch(err){
      console.log(err)
    }
  }

  createTask = async (a, b) => {
    try {
      if(this.state.id != "") {
        await api.put(`/task/${this.state.id}`, {name:a.target.value, description:b.target.value})
      } else {
        await api.post("/task", {name: a.target.value, description:b.target.value});
      }
    } catch(err) {
      console.log(err)
    }
    this.setState({ id:'', name: '', description: '' })
    this.getTasks();
  }

  deleteTask = async (id) => {
    let data = await api.delete(`/task/${id}`)
    this.getTasks();
  }

  updateTask = async (id, name, description) => {
    
    this.setState({ id:id, name: name, description: description })
    console.log(this.state.name)

    this.getTasks();
  }

  setName = (a) => {
    this.setState({name:a});
  }

  setDescription = (a) => {
    this.setState({description:a});
  }

  render () {
    return (
    <div className="App">
      <h1>
        Tasks
      </h1>
        <div>
        <table className="table table-striped">
          <thead>
              <tr>
                  <td>Id</td>
                  <td>Name</td>
                  <td>Description</td>
              </tr>
          </thead>
          <tbody>
              {
                this.state.tasks.map(
                    task =>
                    <tr key= {task.id}>
                        <td>{task.id}</td>
                        <td>{task.name}</td>
                        <td>{task.description}</td>
                        <td><button  type="button" className='btn btn-primary' onClick={() => this.deleteTask(task.id)}>Delete</button></td>
                        <td><button  type="button" className='btn btn-primary' onClick={() => this.updateTask(task.id, task.name, task.description)}>Update</button></td>
                    </tr>
                )
              }
          </tbody>
          </table>
          </div>
          <div>
            <h2>Send Task</h2>
            <input type="text" value={this.state.name.value} onChange={(a) => this.setName(a)}></input>
            <input type="text" value={this.state.description.value} onChange={(a) => this.setDescription(a)}></input>
            <button onClick={() => this.createTask(this.state.name, this.state.description)} type="button" className='btn btn-primary'> Send Task</button>
          </div>
    </div>

  );
}
}

export default App;
