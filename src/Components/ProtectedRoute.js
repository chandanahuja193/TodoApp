import React  from 'react';
import { Route , Redirect } from 'react-router-dom'
import auth from './Auth'

export const ProtectedRoute = ( {component : TodoItem ,  ...rest } ) => {
   
    return(
    
    <Route {...rest}
    render={ props =>{
        if( auth.isLogin() )
        {
            return <TodoItem {...props} />
        }
        else{
            return <Redirect to={
                {
                    pathname : '/',
                    state : {
                        from : props.location
                    }
                }
            } />
        }
    }

    } />


    )
    }

  export default ProtectedRoute;
