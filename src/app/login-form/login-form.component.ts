import { Component, OnInit } from '@angular/core';
//Imports the userLogin class that makes it easier to store the user data
import { userLogin } from './userLogin/userLogin';
//Imports the http class that allows us to make http requests
import {Http, Response, Headers} from '@angular/http';

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

  //User Class that stores information provided by the user
  userInfo: userLogin;

  //JSON data that will be sent
  JData: string;

  //JSON data that will be received
  RData: Object;


  constructor(private http: Http)
  {
    this.userInfo = new userLogin;
  }

  ngOnInit()
  {

  }

  onSubmit(form: any): void
  {
    //console.log('you submitted value:', form);
    console.log('Username: '+ form.username);
    console.log('Password: ' + form.password);



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

      this.userInfo.username = form.username;
      this.userInfo.password = form.password;

      //Turns userInfor object into json
      this.JData = JSON.stringify(this.userInfo);


      //Http request test (GET)
      /*
      this.http.request('http://localhost:3000/')
        .subscribe((res: Response) => {
          this.RData = res.json();
          console.log(res.json());
        });
      */
      //POST REQUEST

      //'Content-Type: application/json'
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');

      this.http
        .post('http://localhost:3000/authenticate', this.JData, {headers: headers})
        .subscribe(data => {  if(JSON.parse(data["_body"])[0]["value"] == "true"){this.validated=true;alert("Login success");} else{this.validated=false} }
        ,error => {console.log(JSON.stringify(error.json()));});


      //To get the validation value: JSON.parse(data["_body"])[0]["value"]



    }



  }


}




