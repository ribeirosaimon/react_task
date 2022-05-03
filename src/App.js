import { useState, useEffect } from "react";
import Axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newName, setNewName] = useState("");
  const [taskList, setTaskList] = useState([]);

  useEffect( () => {
    getTasks();
  }, [])

  const addTask = () => {
    Axios.post("http://localhost:8080/api/task/", {
      name: name,
      description: description,

    }).then(() => {
      setTaskList([
        ...taskList,
        {
          name: name,
          description: description
        },
      ]);
    }).finally(getTasks);
  };

  const getTasks = () => {
    Axios.get("http://localhost:8080/api/task/").then((response) => {
      setTaskList(response.data);
    });
  };

  const updateTask = (id) => {
    Axios.put(`http://localhost:8080/api/task/${id}`, { name: newName, description: newDescription }).then(
      (response) => {
        setTaskList(
          taskList.map((val) => {
            return val.id == id
              ? {
                  id: val.id,
                  name: val.name,
                  description:val.description
                }
              : val;
          })
        )
      }
    ).finally(getTasks);
  };

  const deleteEmployee = (id) => {
    Axios.delete(`http://localhost:8080/api/task/${id}`).then((response) => {
      setTaskList(
        taskList.filter((val) => {
          return val.id != id;
        })
      );
    }).finally(getTasks);
  };

  return (
    <div className="App">
      <div>
        <h1>
          App Task
        </h1>
      </div>
      <div>
        <h2>
          Create Task
        </h2>
        <label>Name:</label>
        <input
          type="text"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <label>Description:</label>
        <input
          type="text"
          onChange={(event) => {
            setDescription(event.target.value);
          }}
        />
        <button onClick={addTask}>Add Task</button>
      </div>

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
          {taskList.map((val, key) => {
          return (

          <tr>
            <td>{val.id}</td>
            <td>{val.name}</td>
            <td>{val.description}</td>
            <td>
            <input
                  type="text"
                  placeholder="Name..."
                  onChange={(event) => {
                    setNewName(event.target.value);
                  }}
                />
            </td>
            <td>
            <input
                  type="text"
                  placeholder="Description..."
                  onChange={(event) => {
                    setNewDescription(event.target.value);
                  }}
                />
            </td>
            <td>
            <button
                  onClick={() => {
                    updateTask(val.id);
                  }}
                >
                  {" "}
                  Update
                </button>
            </td>
            <td>
            <button
                  onClick={() => {
                    deleteEmployee(val.id);
                  }}
                >
                  Delete
                </button>
            </td>
          </tr>
                    );
        })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
