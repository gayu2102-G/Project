import axios from 'axios';
import React , { Component } from 'react';
import shutterstock from './Images/shutterstock.png';
import {withRouter} from 'react-router-dom';
class Homepaging extends React.Component
{
    constructor(){
        super();
        this.state ={
            suggestions: [],
            text:'',
            restaurants:[]
        };
    }
    componentDidMount(){

    }
    handleChange = (event) =>{
        const cityId = event.target.selectedOptions[0].value;
        sessionStorage.setItem("city",cityId);
        console.log(cityId)
        axios({
            method: 'GET',
            url: `http://localhost:5000/api/getRestaurantsByCity/${cityId}`,
            headers: { 'Content-Type': 'application/json' }

        }).then(result => {
            this.setState({
                restaurants: result.data.restaurants
             });
        }).catch(error => {
            console.log(error)
        });
    }

    inputChange = (event) =>{
        const searchInput = event.target.value;
        const { restaurants } = this.state;
        let suggestions = [];
        if ( searchInput.length > 0){
            suggestions = restaurants.filter(

                item => item.name.toLowerCase().includes(searchInput.toLowerCase())
            );
        }
        this.setState({
            suggestions,
            text:searchInput
        });
    }
       
    renderSuggestions = () => {
        const { suggestions} = this.state;
        if (suggestions.length == 0){
            return null;
        }
        return(
            <ul className="suggestionsBox">
                {
                    suggestions.map((item,index) => {
                        return(
                            <li key ={index} onClick={() => this.selectRestaurant(item)} value={item}>{ `${item.name}, ${item.city}` }</li>
                        )
                    })
                }
            </ul>
        )
    }
    selectRestaurant = (item) => {
      
        this.props.history.push(`/restaurantdetails/?id=${item._id}`)
    }
    render(){
       
        const {meal} = this.props;
        console.log(meal);
        const { text, suggestions } = this.state;
        return(
            <React.Fragment>
            <img src={shutterstock}  alt=" " style={{width:'100%',height:'480px',margin:'auto'}} />
    
    <div>
    
    
        <div className="logo">e!</div>
        <div className="heading1"> Find the best restaurants, cafes, bars</div>
        </div>
        <div className="search">
            <select className="search_dropdown" onChange={this.handleChange}>
                <option>Please select a city</option>
               {
                   meal.map((meal,index) => {
                       return <option key={index} value={meal.city_id}>{meal.name},{meal.country_name}</option>
                   })
               }
          </select>
        <div>
            <span className="gylphicon glyphicon-search"></span>
            <input className="input" type="text" value={text} placeholder=" Search for restaurants" onChange={this.inputChange}/>
            {
                this.renderSuggestions()
            }
        </div>
        </div>
        </React.Fragment>
        )
    }
}
    export default withRouter (Homepaging);