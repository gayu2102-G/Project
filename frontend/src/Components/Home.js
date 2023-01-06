import React , { Component } from 'react';
import axios from 'axios';
import './home.css';
import Homepaging from './Homepaging';
import Quicksearch from './Quicksearch';



class Home extends React.Component
{
  constructor(){
      super();
      this.state ={
        meal: [],
        mealtype: []

      };
    }  
    componentDidMount(){
     axios.get('http://localhost:5000/api/mealList').then(result => {
        console.log(result)
        this.setState({
          meal:result.data.meal
       
        })
      }).catch(error => {
        console.log(error);
      });

      axios.get('http://localhost:5000/api/mealtype').then(result => {
        console.log(result)
        this.setState({
          mealtype:result.data.mealtype
        })
      }).catch(error => {
        console.log(error);
      });

    } 

    
    
        render(){
          const {meal} = this.state;
          const {mealtype} = this.state;
        return(
          <div>
            <Homepaging meal={meal}/>
          <Quicksearch mealtype={mealtype}/>
         
          </div>
           
        );
    }
}
export default Home ;