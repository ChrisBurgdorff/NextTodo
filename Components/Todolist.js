import { useState, useEffect } from "react";
import Todo from "./Todo";
import axios from "axios";
import config from '../config';

function Todolist() {
  var sampleTodoList = [
    {id: 0, description: "Take out trash", done: true},
    {id: 1, description: "Go running", done: true},
    {id: 2, description: "Sleep", done: false}
  ];

  const [todoList, setTodoList] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [userEmail, setUserEmail] = useState("");

  //Hooks
  useEffect(() => {
    axios.get(config.API_BASE_URL + '/api/todo')
      .then((response) => {
        setTodoList(response.data);
      });
  }, []);

  function addTodo(e) {
    axios.post(config.API_BASE_URL + '/api/todo', {
      description: newTodo,
      done: false
    }).then((response) => {
      setTodoList([...todoList, response.data]);
      setNewTodo("");
    });
  }

  function toggleDone(todoIndex) {
    console.log("in toggle done");
    var todoToModify = todoList.find(t => t.id === todoIndex);
    var replacementTodo = {
      id: todoToModify.id,
      description: todoToModify.description,
      done: !todoToModify.done
    };
    axios.put(config.API_BASE_URL + '/api/todo/' + todoIndex, {done: !todoToModify.done})
      .then((response) => {
        if (response.data[0] == 1) {
          setTodoList( [...todoList.filter((t) => {
            return (t.id !== todoToModify.id);
          }), replacementTodo].sort(function(a,b) {return a.id - b.id}) );
        } else {
          console.log("Some Shit went wrong");
        }        
      });
  }

  function deleteTodo(todoIndex) {
    axios.delete(config.API_BASE_URL + "/api/todo/" + todoIndex)
      .then((response) => {
        console.log("Response from Delete");
        console.log(response);
        console.log(response.data);
        setTodoList(todoList.filter((t) => {
          return (t.id != todoIndex);
        }));
      });
  }

  return (
    <>
    <article className="panel is-success">
    <p className="panel-heading">
      My Todo List
    </p>    
    <div className="panel-block">
      <p className="control has-icons-left">
      <input className="input is-primary" type="text" placeholder="Add New" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
      <button className="button is-primary" onClick={addTodo}>Add</button>
      <span className="icon is-left">
        <i className="fas fa-circle-plus" aria-hidden="true"></i>
      </span>
      </p>
    </div>
    {todoList.map((todo) => {
      console.log(todo);
      return (
        <Todo todo={todo.description} index={todo.id} done={todo.done} key={todo.todo_id.toString()} toggleDone={toggleDone} deleteTodo={deleteTodo} />
      );
    })}
    </article>
    </>
  );
}

export default Todolist;