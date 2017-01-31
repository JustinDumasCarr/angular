import { Component, OnInit } from '@angular/core';
//Importing authentication service
import { AuthService } from '../services/auth-service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

}
