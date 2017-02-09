import { Component, OnInit } from '@angular/core';

//Imports the http class that allows us to make http requests
import {Http, Response, Headers} from '@angular/http';

//Importing authentication service to only display registration component when logged out
import { AuthService } from '../services/auth-service';


@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit
{


  //Validation Variables
  validated = true;
  userError = "";
  passError = "";

  //RegistrationInfo Class that stores information provided by the user
  regInfo = {"username": "", "password": ""};


  constructor(private http: Http,private authService: AuthService)
  {
  }

  ngOnInit()
  {
  }

  onSubmit(form: any): void
  {
    //console.log('you submitted value:', form);
    console.log("Message: " + JSON.stringify(this.regInfo));



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


    //This is activated if authentication was not successful
    //this.validated = false;

    if(form.username != "" && form.password != "")
    {

      //'Content-Type: application/json'
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');


      //This should be turned into a service later on
      this.http
        .post('http://localhost:3000/register', JSON.stringify(this.regInfo), {headers: headers})
        .subscribe(data => {  /* Does nothing right now */ }
          ,error => {console.log(JSON.stringify(error.json()));});


      alert("Registration is successful");


    }



  }


}
