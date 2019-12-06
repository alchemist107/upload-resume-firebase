import React, { Component } from "react";
import Test from "./Test";

export default class Todo extends Component {
  state = {
    todos: [
      {
        id: "0",
        name: "chams",
        desc: "lalala",
        state: "not yet"
      },
      {
        id: "1",
        name: "df",
        desc: "ddqfd",
        state: "not yet"
      },

      {
        id: "1",
        name: "df",
        desc: "ddqfd",
        state: "not yet"
      },
      {
        id: "1",
        name: "df",
        desc: "ddqfd",
        state: "not yet"
      }
    ],

    name: "",
    desc: "",
    state: "",
    tabID: ""
  };

  deleteTodo(e, id) {
    console.log("yddik", id);

    this.setState({
      todos: this.state.todos.filter(todo => todo !== this.state.todos[id])
    });
  }

  handleInput(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  addTodo(e) {
    const { name, state, desc } = this.state;
    let newTodo = { name, state, desc, id: "5" };
    this.setState({
      todos: this.state.todos.concat(newTodo)
    });
  }

  editTodo(e, id) {
    console.log("XORKING");
    let todo = this.state.todos[id];
    const { name, state, desc } = todo;
    this.setState({
      name,
      state,
      desc,
      tabID: id
    });
  }

  updateTodo(e, id) {
    const { name, state, desc, todos, tabID } = this.state;

    let Updatestodos = todos;
    Updatestodos[tabID] = { name, state, desc, id: tabID };
    this.setState({
      todos: Updatestodos
    });
  }

  render() {
    const { todos } = this.state;
    return (
      <div classNameName="App">
        <header>
          <h2>TODO APP</h2>
        </header>

        <div className="main">
          <div className="add-todo">
            <Test pipe={this.state.name} />
            <div className="todo-name-field">
              <label for="">name</label>
              <input
                type="text"
                className="name-field"
                placeholder="Todo Name ..."
                name="name"
                id=""
                value={this.state.name}
                onChange={e => this.handleInput(e)}
              />
            </div>
            <div className="todo-description-field">
              <label for="">Description</label>
              <input
                type="text"
                className="desc-field"
                placeholder="Todo Description ..."
                name="desc"
                id=""
                value={this.state.desc}
                onChange={e => this.handleInput(e)}
              />
            </div>

            <div className="todo-state-field">
              <label for="">State</label>
              <input
                type="text"
                className="state-field"
                placeholder="Todo State ..."
                name="state"
                id=""
                value={this.state.state}
                onChange={e => this.handleInput(e)}
              />
            </div>

            <div className="todo-add-btn">
              <span className="add-btn" onClick={e => this.addTodo(e)}>
                ADD
              </span>
              <span className="edit-btn" onClick={e => this.updateTodo(e)}>
                Update
              </span>
            </div>
          </div>

          <div className="list-todo">
            <table className="table">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Desc</th>
                <th>State</th>
                <th>Remove</th>
                <th>Edit</th>
              </tr>

              {todos.length >= 1 &&
                todos.map((el, id) => {
                  return (
                    <tr>
                      <td>{el.id}</td>
                      <td>{el.name}</td>
                      <td>{el.desc}</td>
                      <td>{el.state}</td>
                      <td
                        className="remove-todo"
                        onClick={e => this.deleteTodo(e, id)}
                      >
                        X
                      </td>
                      <td
                        className="edit-todo"
                        onClick={e => this.editTodo(e, id)}
                      >
                        Edit
                      </td>
                    </tr>
                  );
                })}
            </table>
          </div>
        </div>
      </div>
    );
  }
}
