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
  
  useEffect(() => {
    if (!loggedInUser) {
      router.push("/t");
    }
  }, []);

  

  //Hooks
  useEffect(() => {
    if (loggedInUser) {
      axios.get(config.API_BASE_URL + '/api/user/' + (loggedInUser.id || '0') + '/todo')
        .then((response) => {
          setTodoList(response.data);
        });
    }
  }, [todoList]);

  function addTodo(e) {
    axios.post(config.API_BASE_URL + '/api/todo', {
      description: newTodo,
      UserId: loggedInUser.id,
      done: false
    }).then((response) => {
      setTodoList([...todoList, response.data]);
      setNewTodo("");
    });
  }

  function toggleDone(todoIndex) {
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
        setTodoList(todoList.filter((t) => {
          return (t.id != todoIndex);
        }));
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
        <Todo todo={todo.description} index={todo.id} done={todo.done} key={todo.todo_id.toString()} toggleDone={toggleDone} deleteTodo={deleteTodo} />
      );
    })}
    </article>
    </>
  );
}

export default Todolist;