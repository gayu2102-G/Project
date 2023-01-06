import React from 'react';
const User = (props) => {
    console.log(props)    //Function component
     return(
         <div>{props.name }, {props.age}</div>
     )
}

export default User;