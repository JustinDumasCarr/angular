import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from './services/auth-service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit
{
  @Input() login: boolean;
  isLoggedIn: boolean;

  constructor(private authService: AuthService)
  {

  }



  ngOnInit()
  {
  }


  logout(): boolean
  {
    console.log("Logout clicked");
    this.authService.logout();
    return false;
  }

}

