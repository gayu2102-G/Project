exports.ValidateUsersignup = (signupdata) => {
    if(!signupdata){
        return false;
    }
    if(!signupdata.email){
        return false;
    }
    if(!signupdata.firstname){
        return false;
    }
   if(!signupdata.Phoneno){
        return false;
    }
    if(!signupdata.Password){
        return false;
    }
}