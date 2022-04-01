import React  from "react";

function Todo( {todo, index, done, toggleDone} ) {

  return (
    <>
      <a className="panel-block" onClick={() => toggleDone(index)}>
      <span className="panel-icon">
          <i className="fas fa-business-time" aria-hidden="true"></i>
        </span>
        {todo}
        
        {done && <span className="icon is-right"><i className="fas fa-square-check" aria-hidden="true"></i></span> }
      </a>
  </>
  );
}

export default Todo;