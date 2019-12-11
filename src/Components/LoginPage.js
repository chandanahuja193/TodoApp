import React , { Component} from 'react';
import {Form,FormGroup, Label } from 'reactstrap';
import {Redirect} from 'react-router-dom';


class LoginPage extends Component{

        constructor(props){
            super(props);
            this.state = {
                loggedUser: {
                    loggedUserName : '',
                    loggedUseId : ''
                },
                email : '',
                passWord : '',
                isLogin : false 
            }
           
        }
        
        

        handleEmail = (e) =>{
            this.setState(
                {
                 email : e.target.value })
                }

        handlePassword = (e) =>{
            this.setState(
                { 
                passWord : e.target.value })
                }

        
                
           mySubmitHandler = (e) =>
           {

            e.preventDefault();
             var storedUsers = JSON.parse(localStorage.getItem("users"));

            for(var i = 0 ; i < storedUsers.length; i++)
                {
                    var user = storedUsers[i];
                    var UserId = "";
                    var userName = "";
                    var isLogin = false;
                    if( this.state.email == user.email &&  this.state.passWord == user.password)
                        {
                                isLogin = true;
                                UserId= user.userId;
                                userName = user.name;      
                                break;
                        }
    
                  } 
                    if(isLogin)
                    {
                        this.setState
                                (
                                    { isLogin : true ,
                                      loggedUser :{
                                      loggedUserName : userName,
                                      loggedUseId : UserId
                                                    }
                                    }
                                )
                    }
                    else{
                        alert("Invalid username and password");
                    }
                             
              
            }
                
            
            
            

        render(){
            const { isLogin , loggedUser} = this.state

            if(isLogin){
           
              return  <Redirect to={{
                  pathname : '/TodoItem',
                  state : {loggedUser : loggedUser, isLogin : isLogin }
              }} />
            }
           
            
            
            
            return(
                <div className="wrapper">

                <Form className="LoginPage" onSubmit={this.mySubmitHandler}>
                    <h1 className="Header">login</h1>


                <FormGroup>
                <Label htmlFor="email"> Email</Label>
                <input type="email"  onChange={this.handleEmail} placeholder="Enter email" id="email" required />  
                </FormGroup>

                <FormGroup>
                <Label htmlFor="password"> Password</Label>
                <input type="password"  onChange={this.handlePassword}  placeholder="Enter password" id="password" required />  
                </FormGroup>
                <button type="submit" className="btn  btn-outline-success my-btn" >Login</button>
                </Form>
                </div>
            
                
            )
        }

}

export default LoginPage;

