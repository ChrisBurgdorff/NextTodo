import React  from "react";

function Todo( {todo, index, done, toggleDone, deleteTodo} ) {

  return (
    <div className="level">
      <div className="level-left">
      <a className="panel-block" onClick={() => toggleDone(index)}>
      <span className="panel-icon">
          <i className="fas fa-business-time" aria-hidden="true"></i>
        </span>
        {todo}
        
        {done && <span className="icon"><i className="fas fa-square-check" aria-hidden="true"></i></span> }
      </a>
      </div>
      <div className="level-right">
        <a onClick={() => deleteTodo(index)} ><span><i className="fas fa-trash" aria-hidden="true"></i></span></a>
      </div>
  </div>
  );
}

export default Todo;