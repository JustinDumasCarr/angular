import { Component, OnInit } from '@angular/core';

//Importing authentication service
import { AuthService } from '../services/auth-service';

//Importing routing modules
import {Router} from '@angular/router';

//Importing Event Emitter for login function

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit
{

  //Validation Variables
  validated = true;
  userError = "";
  passError = "";


  logInfo = {"username": "", "password": ""};

  response: string;



  constructor(private authService: AuthService,private router: Router)
  {
  }

  ngOnInit()
  {
  }

  onSubmit(form: any): boolean
  {
    //console.log('you submitted value:', form);
    //Delete this later
    console.log("Message: " + JSON.stringify(this.logInfo));



    //Activated if username is empty and makes user input red
    if(form.username=="")
    {
      this.userError = "error";
    }
    else
    {
      this.userError = "";
    }

    if(form.password=="")
    {
      this.passError = "error";
    }
    else
    {
      this.passError = "";
    }

    //If neither of the fields are empty then it proceeds to the authentication service
    if(form.username != "" && form.password != "")
    {

      this.authService.login(form.username, form.password)
        .subscribe
        (

          data => {
                    this.response = data;
                    if(this.response == "true")
                    {
                      this.validated = true;
                      alert("Login Successful");

                      //Navigates to the protected component
                      this.router.navigate(['/account']);

                    }
                    if(this.response == "false")
                    {
                      this.validated = false;
                    }

                  }
          //Database error validation goes here
    /*      error =>  this.errorMessage = <any>error  */

        );
    }
  return false;
  }




}




