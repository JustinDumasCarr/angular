import { Injectable } from '@angular/core';

//Imports the http class that allows us to make http requests
import {Http, Response, Headers,RequestOptions} from '@angular/http';

//Importing Observable that is needed for http request
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthService
{

  //Sets the default empty values
  logInfo = {"username": "", "password": ""};
  authentication: string;

  constructor(private http: Http) { }

  login(user: string, password: string): Observable<string>
  {

    this.logInfo.username = user;
    this.logInfo.password = password;

    //POST REQUEST
    let bodyString = JSON.stringify(this.logInfo);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http
      .post('http://localhost:3000/login', bodyString, options)
      .map((res:Response)=>
      {

        this.authentication = JSON.parse(res["_body"])[0]["value"];
        if(this.authentication=="true")
        {
          localStorage.setItem('username', user);
         //
        }
        else
        {
        //
        }

        //Returns the value sp that validation can be done on the login component
        return this.authentication;
      })
      .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any



  }

  //Logout function
  logout(): any
  {
    localStorage.removeItem('username');
  }


  //Get user function
  getUser(): any
  {
    return localStorage.getItem('username');
  }

  //Checking if the user is logged in
  isLoggedIn(): boolean
  {
    return this.getUser() !== null;
  }


}

export var AUTH_PROVIDERS: Array<any> = [
  { provide: AuthService, useClass: AuthService }
];
