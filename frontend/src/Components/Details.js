
import React from 'react';
import queryString from 'query-string';
import Modal from 'react-modal';
import axios from 'axios';
import { Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const customStyles ={
content:{
inset: '40px',
border: '1px solid rgb(204, 204, 204)',
background: 'lightyellow',
overflow: 'auto',
height: '500px',
borderradius: '4px',
width: '400px'
}


};


 class Details extends React.Component{

    constructor(props){
    super(props);
    this.state = {
        restaurants: {},
        menu: [],
        isModalOpen: false,
        Order:[],
        count:0,
     
     
        
         
    };
}

componentDidMount(){
const queryParams = queryString.parse(this.props.location.search);
const restaurantId = queryParams.id;
axios({
    method:'GET',
    url:`http://localhost:5000/api/getRestaurantsById/${restaurantId}`,
    headers:{'Content-Type':'application/json'}
}).then(result => {

this.setState({ 
    restaurants: result.data.restaurants
});
}).catch(error => {
            console.log(error)
})


axios({
    method:'GET',
    url:`http://localhost:5000/api/getMenuForRestaurant/${restaurantId}`,
    headers:{'Content-Type':'application/json'}
}).then(result => {
   
this.setState({ 
menu: result.data.menu
});
}).catch(error => {
            console.log(error)
})
}

handlePlaceOrder = (e) => {
 
  
    this.setState({
        isModalOpen: true
    });
}
cancelPayment = ( ) =>
{
    this.setState({
        isModalOpen: false
    });
}

getData = (data) => {
     return fetch(`http://localhost:5000/api/Payment`, {
         method: 'POST',
         headers: {
             Accept: "application/json",
             "Content-Type": "application/json"
         },
         body:JSON.stringify(data)
     }).then(response => {
        return response.json()
     })  .catch(error => {
         console.log(error);
     });
}  
obj = (val) => {
    return typeof val === 'object';
}

isDate = (val) => {
    return Object.prototype.toString.call(val) === '[object Date]';
}

stringifyMyParam = (paramValue) => {
    // check if the paramValue is an object or date, if yes, then stringify
    // else return the value
    if (this.obj(paramValue) && !this.isDate(paramValue)) {
        return JSON.stringify(paramValue);
    } else {
        return paramValue;
    }
}

buildForm = (details) => {
    const { action, params } = details;
    // create a form
    // attach an action to the form
    // create fields on the form

    const form = document.createElement('form'); // <form></form>
    form.setAttribute('method', 'post'); // <form method="post"></form>
    form.setAttribute('action', action); // <form method="post" action="action"></form>

    Object.keys(params).forEach(key => {
        const input = document.createElement('input'); // <form method="post" action="action"><input /></form>
        input.setAttribute('type', 'hidden'); // <form method="post" action="action"><input type="hidden"/></form>
        input.setAttribute('name', key);
        input.setAttribute('value', this.stringifyMyParam(params[key]));
        form.appendChild(input);
    });

    return form;
}

takeMeToPaymentGateway = (details) => {
    // take user to payment gateway
    // For the procedure of taking the user from our application to payment gateway's website in a secure manner
    // we don't create the HTML element before hand.
    /*
    (1) The HTML form which takes us to paytm gateway is created on the fly (only when it is needed)
    (2) We immediately destroy that form
    */
   const form = this.buildForm(details);
   document.body.appendChild(form);
   form.submit();
   form.remove();
}

    



makePayment = () => {
    /*
    (1) We will have to fetch some coded information from BE server (NodeJS)
    (2) take the coded information / checksum and redirect to paytm gateway page
    (3) From here onwards, everything is taken care by payment gateway
    */
    this.getData({
        amount: 100,
        email: 'Gayatri_Jadhav@live.com'
       
    }).then(response => {
        var information = {
            action: "https://securegw-stage.paytm.in/order/process",
            params: response.checkSumResponse
        };
        this.takeMeToPaymentGateway(information);
    }).catch(error => {
        console.log(error);
    });
}

  IncrementItem = () => {
    this.setState({ count: this.state.count + 1 });
  }
  
  DecreaseItem = () => {
    this.setState({ count: this.state.count - 1 });
  }




render(){
    const { restaurants, isModalOpen, menu} = this.state;
    return(
   <>
    <div className="container">
        <img src={ restaurants.thumb } alt="" width="100%" height="500px" className="mt-5"/>
        <h2 className="mt-3">{ restaurants.name }</h2>
        <div style={{'position':'absolute','right':'180px','top':'630px'}}>
            <button type="button" class="btn btn-danger" style={{'color': 'white','background-color': 'red'}} 
            onClick={this.handlePlaceOrder}>Place Online order</button></div>
    
    <div className="mt-3">
        <Tabs>
            <TabList>
            <Tab>Overview</Tab>
            <Tab>Contact</Tab>
            </TabList>

            <TabPanel>
            <h3>About this Place</h3>
            <h4>Cuisine</h4>
            <div>
                {
                    restaurants.Cuisine && restaurants.Cuisine.length > 0
                    ?
                    restaurants.Cuisine.map(item => {
                        return <span>{ item.name }, </span>
                    })
                    :
                    null
              }
            </div>
            <h4>Average Cost</h4>
            <div>{restaurants.cost}</div>
            </TabPanel>

            <TabPanel>
                <h4>Phone Number</h4>
                <div>-91 9845332365</div>
                <h4 className="mt-3">Address</h4>
                <h5>{restaurants.name}</h5>
                <div>{restaurants.address}</div>
            </TabPanel>
        </Tabs>
                <Modal  isOpen={isModalOpen} style={customStyles}>
                 
                      <div>
                          {
                              menu.map((item, index) => {
                                  return (
                                      <div className="row">
                                       <div><img  style={{width: '300px',
    paddingLeft: '20px',
   
    paddingBottom: '20px'}} src={require('./Images/matar.png').default} alt=''/>
</div>
                                          <div className="col-6" style={{color:'red',fontSize:'20px',width:'bolder',marginLeft:'20px'}}>{item.item}</div>
                                          <div  className="col-4" style={{color:'red',fontSize:'20px'}}>{item.cost}</div>
                                           
                                          <div >
        <button  style={{color:'darkblue'}} onClick={this.IncrementItem} className="counter">+</button>
        <h2 style={{color:'darkblue'}}>{this.state.count}</h2>
        <button style={{color:'darkblue'}}onClick={this.DecreaseItem} className="counter">-</button>
                                   
        
        
      </div>
                                          
                                      </div>
                                          
                                  )
                              })
                          }
                          </div>
                          {
                menu.map((item, index) => {
                     return (
      <div className="row"> 
      <div style={{color:'darkblue',width:'bold',position: 'absolute',
padding: '100px'}}   className="float-left" onChange={this.amountchange}>Total Amount:{this.state.count * 100}</div><br></br>
              <div >
              <div ><button style={{position:'absolute',marginLeft: '50px'}}type="button" class="btn btn-danger" onClick={this.makePayment}>Pay now</button></div>
                 <div ><button style={{position:'absolute',marginLeft: '200px'}} type="button" class="btn btn-danger" onClick={this.cancelPayment}>Cancel</button></div>  
                  </div>
          </div>
                     )
                          })
}
                         
                   </Modal>
                   
    </div>
    </div>
   </>
    )

  }
 }
 export default Details;
