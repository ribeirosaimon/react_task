import { useState } from "react";
import Axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newName, setNewName] = useState("");
  const [taskList, setTaskList] = useState([]);

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
    });
    this.getTasks();
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
        );
      }
    );
  };

  const deleteEmployee = (id) => {
    Axios.delete(`http://localhost:8080/api/task/${id}`).then((response) => {
      setTaskList(
        taskList.filter((val) => {
          return val.id != id;
        })
      );
    });
  };

  return (
    <div className="App">
      <div className="information">
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
      <div className="tasks">
        <button onClick={getTasks}>Show Tasks</button>

        {taskList.map((val, key) => {
          return (
            <div className="task">
              <div>
                <h3>Id: {val.id}</h3>
                <h3>Name: {val.name}</h3>
                <h3>Description: {val.description}</h3>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Name..."
                  onChange={(event) => {
                    setNewName(event.target.value);
                  }}
                />
                <input
                  type="text"
                  placeholder="Description..."
                  onChange={(event) => {
                    setNewDescription(event.target.value);
                  }}
                />
                <button
                  onClick={() => {
                    updateTask(val.id);
                  }}
                >
                  {" "}
                  Update
                </button>

                <button
                  onClick={() => {
                    deleteEmployee(val.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
