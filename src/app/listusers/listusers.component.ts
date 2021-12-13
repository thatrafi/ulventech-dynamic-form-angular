import { Component, OnInit } from '@angular/core';
import { IForm } from '../form';
import { FormService } from '../form.service';

@Component({
  selector: 'app-listusers',
  templateUrl: './listusers.component.html',
  styleUrls: ['./listusers.component.css']
})
export class ListusersComponent implements OnInit {
  public forms : IForm[] = [];

  constructor(private _userService : FormService) { 
    
  }

  ngOnInit() {
    this._userService.getUsers().subscribe({
      next: res => {
          console.log(res)
          this.forms = res.data;
      },
      error: error => {
          console.error('There was an error!', error);
      }
  })   
  }

}
