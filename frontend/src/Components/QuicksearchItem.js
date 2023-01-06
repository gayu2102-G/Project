import React , { Component } from 'react';
import { withRouter } from 'react-router-dom';

class QuicksearchItem extends React.Component
{
  constructor(){
    super();
}

handleClick(id){
  this.props.history.push(`/filter/?mealtype=${id}`);
}

    render(){
      const {id, mealtype} = this.props;
      console.log(mealtype);
      const { name, content, image} = mealtype;
      const imagePath = require(`./${image}`).default;
      console.log(imagePath);
        return(
            <>

            <div className="box clickable-item"  onClick={() => this.handleClick(id)}>
             <img src={imagePath} alt="" height="140" width="140" />
             <div className="Box2">{name} </div>
             <div className="Box3"> { content } </div>
             </div>
    </>  
      )
  }
}
export default withRouter(QuicksearchItem);