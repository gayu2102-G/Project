
const User = require('../Models/User');


exports.signup = (req, res)  => {
        const email = req.body.email;
        const firstname = req.body.firstname;
        const Phoneno = req.body.Phoneno;
        const Password = req.body.Password;

        const signupUser = new User({ //model class
            email: email,
            firstname: firstname,
            Phoneno: Phoneno,
            Password: Password
        });
        signupUser.save().then(
            result => {
                res.status(200).json({
                    message : "User sign up Successfully",
                    user : result
                })
            }
        ).catch(
            error => {
                res.status(500).json({
                    message : error
                })
            }
        );
}


exports.Login = (req, res)  => {
    const email = req.body.email;
    const Password = req.body.Password;

    User.find({
        email: email,
        Password: Password
    }).then(
        result => {
            if(result.length >=1 ){
                res.status(200).json({
                    message: "user logged in sucessfully",
                    isAuthenticated: true,
                    User: result
                });
            }else{
                res.status(200).json({
                    message: "user not logged in sucessfully",
                    isAuthenticated: false,
                    User: result
            });
        }
    }
    ).catch(
        error => {
            res.status(500).json({
                message : error
        })
    }
    );
}
