import { useState, useEffect, useContext } from "react";
import Todo from "./Todo";
import axios from "axios";
import config from '../config';
import { AuthContext } from "../Contexts/AuthContext";
import { useRouter } from 'next/router';

function Todolist() {
  var sampleTodoList = [
    {id: 0, description: "Take out trash", done: true},
    {id: 1, description: "Go running", done: true},
    {id: 2, description: "Sleep", done: false}
  ];

  const [todoList, setTodoList] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const {loggedInUser, setLoggedInUser} = useContext(AuthContext);
  const router = useRouter();

  var todosUpdated = false;  

  //Hooks
  useEffect(() => {
    console.log("in useeffect");
    if (loggedInUser) {
      console.log("REQUEST GOING TO " + '/api/user/' + (loggedInUser.id || '0') + '/todo');
      axios.get(config.API_BASE_URL + '/api/user/' + (loggedInUser.id || '0') + '/todo')
        .then((response) => {
          setTodoList(response.data);
        });
    } else {
      console.log("No logged in user");
      setLoggedInUser(config.nullUser);
    }
  }, [todosUpdated, loggedInUser?.name]);

  function addTodo(e) {
    axios.post(config.API_BASE_URL + '/api/todo', {
      description: newTodo,
      UserId: loggedInUser.id,
      done: false
    }).then((response) => {
      setTodoList([...todoList, response.data]);
      setNewTodo("");
      todosUpdated = !todosUpdated;
    });
  }

  function toggleDone(todoIndex) {
    var todoToModify = todoList.find(t => t.todo_id === todoIndex);
    var replacementTodo = {
      todo_id: todoToModify.todo_id,
      description: todoToModify.description,
      done: !todoToModify.done
    };
    axios.put(config.API_BASE_URL + '/api/todo/' + todoIndex, {done: !todoToModify.done})
      .then((response) => {
        console.log(response.data);
        if (response.data) {
          setTodoList( [...todoList.filter((t) => {
            return (t.todo_id !== todoToModify.todo_id);
          }), replacementTodo].sort(function(a,b) {return a.todo_id - b.todo_id}) );
          todosUpdated = !todosUpdated;
        } else {
          console.log("Some Shit went wrong");
        }        
      });
  }

  function deleteTodo(todoIndex) {
    axios.delete(config.API_BASE_URL + "/api/todo/" + todoIndex)
      .then((response) => {
        setTodoList(todoList.filter((t) => {
          return (t.todo_id != todoIndex);
        }));
        todosUpdated = !todosUpdated;
      });
  }


  return (
    <>
    <article className="panel is-success">
    {(loggedInUser && loggedInUser.id > 0) &&
    <p className="panel-heading">
      {loggedInUser.name}'s ToDo List!
    </p>}
    {(!loggedInUser || loggedInUser.id == 0) && 
    <p className="panel-heading">
      Your ToDoList  
    </p>}
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
      return (
        <>
        <Todo todo={todo.description} index={todo.todo_id} done={todo.done} key={todo.todo_id} toggleDone={toggleDone} deleteTodo={deleteTodo} />
        </>
      );
    })}
    </article>
    </>
  );
}

export default Todolist;