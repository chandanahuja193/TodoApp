import React , {Component} from 'react';
import TodoList from './TodoList'
import { withRouter } from 'react-router-dom';



class TodoItem extends Component{

            constructor(props){
                super(props);
                this.state = {
                    currentTodo: '',
                    Todos : []
                }
                
            }

            componentDidMount(){
                if(!localStorage.todoListState){  
                    localStorage.setItem('todoListState',JSON.stringify(this.state.Todos));
  
                } 
                   const localTodoArray = JSON.parse(localStorage.todoListState);
                   this.setState({
                    Todos :  localTodoArray
                   }) 


            }

            componentDidUpdate(){
                localStorage.setItem('todoListState',JSON.stringify(this.state.Todos));            
            }


            handleInput = (e) =>{    
                this.setState( {
                    currentTodo: e.target.value
                })

            }

             addTodo = (e) =>{    
                const {loggedUserName, loggedUseId }  =   this.props.location.state.loggedUser;
                                 
                e.preventDefault();
                
                const newTodoObject = {
                   task : this.state.currentTodo,
                   id : Date.now(),
                   completed : false,
                   LoggedUserId : loggedUseId
               }
               if(newTodoObject.task !== "")
               {
               this.setState({
                Todos : [...this.state.Todos , newTodoObject],
                currentTodo : ''
               })
                }
            }

            deleteItem = (id) =>{
            const filteredTodos =    this.state.Todos.filter(todo => todo.id !== id )
            this.setState({
                Todos : filteredTodos
            })
            }

            updateitem = (text , id) =>{
                const Todos = this.state.Todos;
                Todos.map( todo =>{
                    if(todo.id === id) todo.task = text;
                })
                this.setState({
                    Todos : Todos 
                })
            }

            isCompleted = (checked,id) =>{
                this.setState({
                    Todos :   [...this.state.Todos].map( todo =>{
                        if(todo.id === id){
                            todo.completed = !todo.completed;
                            return todo;
                        }
                        else return todo;
                    })
                })
            }

            handleClearCompleted = () =>{
                const {loggedUseId }  =   this.props.location.state.loggedUser;
                this.setState({
                    Todos : [...this.state.Todos].filter( todo =>{
                        if( todo.completed !== true )  return todo;
                        } )
                })
            }





                logOut = () =>{
                
                this.props.history.push('/')
                }

            render(){
            const {loggedUserName, loggedUseId }  =   this.props.location.state.loggedUser;
                
                return(
                    <div className="Todoitem">
                        <div className="header">
                        <h3 style={ { float : 'left', margin: '8px'} }>Welcome <span className="text-success text-uppercase"> {loggedUserName} </span></h3>
                        <button type="button" onClick={ () =>  this.logOut() } style={ { float : 'right', margin: '8px'} } className="btn  btn-primary">LOGOUT</button>
                        <h1>Add Some Todo</h1>       
                        </div>
                        
                        <div className="container">
                            <div className="row">
                                <div className="col-10 mx-auto col-md-8 mt-4 text-center">
                                    <div className="card card-body my-3">
                                    {/*Start  Todo input group */}
                                     <form>                                        
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text bg-primary text-white"> 
                                                <i className="fas fa-book"></i>
                                                </div>
                                             </div>
                                            <input type="text" 
                                            className="form-control"
                                            placeholder="add a todo"
                                            value={this.state.currentTodo}
                                            onChange={this.handleInput}
                                              />
                                        </div>
                                            <button type="submit" 
                                            onClick={this.addTodo}
                                            className="btn btn-block btn-primary mt-3">
                                            AddTodo
                                            </button>
                                    </form>
                                    {/*End  Todo input group */}
                                
                                </div>
                            
                    </div>
                </div>
                <div className="row">
                <div className="col-10 mx-auto col-md-8 mt-4 text-center"> 
                  {/* Add item to todolist */}
                  < TodoList todos = {this.state.Todos}
                   loggedUseId={loggedUseId}
                   deleteItem={this.deleteItem}
                   updateitem={this.updateitem} 
                   isCompleted={this.isCompleted}
                   handleClearCompleted={this.handleClearCompleted}
                   />
                </div>
                </div>
                              
            </div>
        

                            
    </div>
     );         
}
}
export default withRouter(TodoItem);
