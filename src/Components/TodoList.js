import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const  TodoList = ( {todos , loggedUseId , deleteItem , updateitem , isCompleted, handleClearCompleted} ) =>{
    
    const newTodo = todos.length ?
                    todos.filter(todo =>{
                        return todo.LoggedUserId === loggedUseId
                    } )
                    .map( (todo) => { 
                    return (
                    <div className="card-body"  key={todo.id}> 
                      <input className="lead text-capitalize text-primary"
                      disabled={todo.completed}
                      type="text"
                      id={todo.id}
                      value={todo.task}
                      onChange={ e =>{ updateitem(e.target.value , todo.id)  }}
                      />
                      <div>
                      <input type="checkbox" className="mx-3"
                      onChange={(e) => isCompleted(e.target.checked, todo.id)}
                     
                      />
                      <span> <FontAwesomeIcon  style={{cursor : 'pointer'}} icon="trash" onClick={ () => deleteItem(todo.id)} /></span>
                      </div>
                        
                    </div>
                    )
                    }) 
                    : ( <h1 className="text-success ">You dont have todos</h1>)
     
        return (
            <div className="TodoList">
                <div className="card ">
                    { newTodo }
                    <div className="card-footer">
                         <button className="btn btn-block btn-danger text-capitalize" onClick={ () => handleClearCompleted() }>Clear list </button>
                    </div>
              </div>
        </div>
            
        )
    
}
export default TodoList;
