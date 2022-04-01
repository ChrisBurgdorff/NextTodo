import { useState } from "react";
import Todo from "./Todo";

function Todolist() {
  var sampleTodoList = [
    {id: 0, description: "Take out trash", done: true},
    {id: 1, description: "Go running", done: true},
    {id: 2, description: "Sleep", done: false}
  ];

  const [todoList, setTodoList] = useState(sampleTodoList);
  const [newTodo, setNewTodo] = useState("");

  function addTodo() {
    var nextId = Math.max(...todoList.map(t => t.id)) + 1;
    setTodoList([...todoList, {id: nextId, description: newTodo, done: false}]);
    setNewTodo("");
  }

  function toggleDone(todoIndex) {
    var todoToModify = todoList.find(t => t.id === todoIndex);
    var replacementTodo = {
      id: todoToModify.id,
      description: todoToModify.description,
      done: !todoToModify.done
    };
    setTodoList( [...todoList.filter((t) => {
      return (t.id !== todoToModify.id);
    }), replacementTodo].sort(function(a,b) {return a.id - b.id}) );
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
      <button onClick={addTodo}>Click</button>
      <span className="icon is-left">
        <i className="fas fa-circle-plus" aria-hidden="true"></i>
      </span>
      </p>
    </div>
    {todoList.map((todo) => {
      return (
        <Todo todo={todo.description} index={todo.id} done={todo.done} toggleDone={toggleDone} />
      );
    })}
    </article>
    </>
  );
}

export default Todolist;