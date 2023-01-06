import React ,{ components } from 'react';
import User from './User';
class Users extends React.Component{
    render(){
        return(
            <div>
                <h1>{this.props.title}</h1> 
            <User name="gayatri" age="20" />
            <User name="gayu" age="20" />
            </div>
        )
    }
}
export default Users;