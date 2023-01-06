import React from 'react';
import style from '../Components/header.css';

import Modal from 'react-modal';


import axios from 'axios';

const customStyles ={
        content:{
    inset: '40px',
    border: '1px solid rgb(204, 204, 204)',
    background: 'lightyellow',
    overflow: 'auto',
    height: '400px',
    borderradius: '4px',
  width: '400px'
}

        }


class Header extends React.Component {
    constructor(){
        super();
        this.state = {
            isModalOpen: false,
            isLoginModalOpen: false,
            email:'',
            firstname:'',
            Phoneno:'',
            Password:'',
            isLoggedIn: false
        };
    }

    
  handleChange = (event, statevariable) => {
    this.setState({
      [statevariable]: event.target.value
    });
  }

  signUpHandler = ( event) => {
      //Make ApI calls
    const { email, firstname, Phoneno, Password } = this.state;

    const signUpRequestObj = {
        email: email,
        firstname:firstname,
        Phoneno:Phoneno,
        Password:Password
        }

    axios({
        method: 'POST',
        url: 'http://localhost:5000/api/signup',
        
        data: signUpRequestObj
    }).then(
       response => {
           if (response.data.message = 'user logged in sucessfully'){
               this.setState ({
                isModalOpen: false,
               email:'',
               firstname:'',
               Phoneno:'',
               Password:''
         });
           alert(response.data.message);
           }
       }
      
    ).catch(error => {
        console.log(error);
        alert(error);
    })

  }

  signcancelHandler = (event) => {
    this.setState({
        isModalOpen: false,
    });
  }

  signUpOpenHandler = ( event) => {
    
    this.setState({
        isModalOpen: true,
    });
}
LoginHandler = ( event) => {
    
    this.setState({
        isLoginModalOpen: true,
    });
}

LoginupHandler = ( event) => {
    //Make ApI calls
  const { email, Password } = this.state;

  const loginRequestObj = {
      email: email,
      Password:Password
      }

  axios({
      method: 'POST',
      url: 'http://localhost:5000/api/Login',
      data: loginRequestObj
  }).then(
     response => {
         if (response.data.User.length >= 1){
             this.setState ({
              isLoginModalOpen: false,
             email:'',
             Password:'',
             isLoggedIn: response.data.isAuthenticated
       });
       sessionStorage.setItem('isLoggedIn', response.data.isAuthenticated)//user is Logged or not
         }
     }
    
  ).catch(error => {
      console.log(error);
      alert(error);
  })

}

signcancelHandler = (event) => {
  this.setState({
      isModalOpen: false,
  });
}

signUpOpenHandler = ( event) => {
  
  this.setState({
      isModalOpen: true,
  });
}

LoginCancelHandler = (event) => {
        this.setState({
            isLoginModalOpen: false,
        });
      }

      LogoutHandler =(event) => {
          this.setState({
              firstname:'',
              isLoggedIn: false
          });
          sessionStorage.setItem('isLoggedIn',false);
      }

    render(){
        const { isModalOpen ,
            isLoginModalOpen,
            email,
            firstname,
            Phoneno,
            Password,
            isLoggedIn
        } = this.state;

        return(
            <React.Fragment>
                <div>
                <div className="header">
                    <div className="btn-group login">
                        {
                            isLoggedIn 
                            ?
                            <div>
                            <span>{firstname}</span>
                            <button className="btn btm-sm btm-primary ml-3 " onClick={this.LogoutHandler}>Logout</button></div>
                            :
                        <div>

                    <button className="btn b1 " onClick={this.LoginHandler}>Login</button>
                    <button className="btn  b2 " onClick={this.signUpOpenHandler}>Signup</button>
                    </div>
                        }
                         </div>
                   
                         <Modal
                         isOpen={isModalOpen}
                         style={customStyles}>
                            <div>
                                <h3 style = {{ textAlign:'center',width:'bold',padding:'20px'}} >Signup User</h3>
                                <div>
                                 
                                    <span style={{ padding:'20px',width:'bold' }}>Email</span>
                                    <input  style={{ marginLeft:'40px'}} type="text" value={email} onChange={(event) => this.handleChange(event, 'email')}></input>
                                    </div>

                                    <div>
                                <label style={{ padding:'20px',width:'bold' }} >Name:</label>
                                <input  style={{ marginLeft:'30px'}} type="text" value={firstname} onChange={(event) => this.handleChange(event, 'firstname')}></input>
                                </div>

                               <div><label style={{ padding:'20px',width:'bold' }} >Phoneno:</label>
                                <input style={{ margin:'10px'}} type="text" value={Phoneno} onChange={(event) => this.handleChange(event, 'Phoneno')}></input><br/>
                                </div>

                                <div>
                                <span style={{ padding:'20px',width:'bold' }} >Password</span>
                                    <input  style={{ margin:'10px'}} type="text" value={Password} onChange={(event) => this.handleChange(event, 'Password')}></input>
                                    </div>
                                <div>
                             
                    <button style={{ margin:'40px'}} onClick={this.signUpHandler} className="btn   btn-primary ">Signup</button>
                             
                    <button style={{ margin:'40px'}} onClick={this.signcancelHandler} className="btn  btn-primary ">cancel</button>
                                </div>
                            </div>
                         </Modal>
                         </div>
                         <Modal isOpen={isLoginModalOpen} style={customStyles}>
                         <div>
                                <h3 style = {{ textAlign:'center',width:'bold',padding:'20px'}}>Login User</h3>
                                <div>
                                    <span style={{ padding:'40px',width:'bold' }}>Email</span>
                                    <input  style={{ margin:'20px'}}type="text" value={email} onChange={(event) => this.handleChange(event, 'email')}></input>
                                    </div>

                                    <div>
                                <span  style={{ padding:'35px' }}>Password</span>
                                    <input type="text" value={Password} onChange={(event) => this.handleChange(event, 'Password')}></input>
                                    </div>
                                  
                                <div>
                             
                    <button style={{ margin:'40px'}} onClick={this.LoginupHandler} className="btn   btn-primary ">Login</button>
                    <button style={{ margin:'40px'}} onClick={this.LoginCancelHandler} className="btn   btn-primary ">cancel</button>
                                </div>
                            </div>
                         </Modal>
                  
                    </div>
            </React.Fragment>
        )
    }
}
export default Header;