import React , * as react from 'react';
import './App.css';
import { Route,  withRouter ,Switch , Redirect,  BrowserRouter as Router} from 'react-router-dom';
import LoginPage from './Components/LoginPage'
import TodoItem from './Components/Todoitem'
import { ProtectedRoute } from "./Components/ProtectedRoute";
import 'bootstrap/dist/css/bootstrap.min.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash} from '@fortawesome/free-solid-svg-icons'

library.add(faTrash)

class  App extends react.Component {


  constructor(props){

    super(props);
    this.state = {
            users : [
        { name: "rajat", email : "rajat12@gmail.com" , password : 1234, userId: 1 },
        { name: "ram", email : "ram25@gmail.com" , password : 1987, userId: 2 },
        { name: "mohan", email : "mohan1@gmail.com" , password : 7896, userId: 3 }
        
    ],
        isLogin : false
    }
    // Store the previous pathname and search strings
    this.currentPathname = null;
    this.currentSearch = null;
  
    
}

      componentDidMount(){
        this.setState(
          localStorage.setItem("users",JSON.stringify(this.state.users))
      )
      const { history } = this.props;

    history.listen((newLocation, action) => {
      if (action === "PUSH") {
        if (
          newLocation.pathname !== this.currentPathname ||
          newLocation.search !== this.currentSearch
        ) {
          // Save new location
          this.currentPathname = newLocation.pathname;
          this.currentSearch = newLocation.search;

          // Clone location object and push it to history
          history.push({
            pathname: newLocation.pathname,
            search: newLocation.search
          });
        }
      } else {
        // Send user back if they try to navigate back
        history.go(1);
      }
    });


      } 


     
     
          render(){
          return (
            <Router>
              <Route exact path="/" render={() => <LoginPage /> }  />
               <Route exact path='/todoitem'   component={ () =>  <TodoItem />  }  />
               {/* <ProtectedRoute exact path='/todoitem' component={TodoItem}  /> */}
            </Router> 
          );
        }
}


export default  withRouter(App);





