import React , { Component } from 'react';

import breakfast from './Images/breakfast.png';
import lunch from './Images/lunch.png';
import snacks from './Images/snacks.png';
import dinner from './Images/dinner.png';
import drinks from './Images/drinks.png';
import nightlife from './Images/nightlife.png';

import QuicksearchItem from './QuicksearchItem';
class Quicksearch extends React.Component
{
  constructor(){
    super();
}
    render(){
      const {mealtype} = this.props;
        console.log(mealtype);
        return(
            <>
            
  <div className="quicksearch">
    <p className="quick_Heading">
        Quick Searches
    </p>
    <p className="quick_SubHeading">
        Discover restaurants by type of meal
    </p>
    
    <div className="container-fluid" >
    {
      mealtype.map((mealtype,index) => {

      return  <QuicksearchItem key={index} id={index+1} mealtype={ mealtype} />

      })
    }
      </div>     
      </div>
      </>
        )
    }
}
export default Quicksearch;