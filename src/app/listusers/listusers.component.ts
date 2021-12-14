import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder } from '@angular/forms';
import { IApiResult } from '../ApiResult';
import { IForm } from '../form';
import { FormService } from '../form.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-listusers',
  templateUrl: './listusers.component.html',
  styleUrls: ['./listusers.component.css']
})
export class ListusersComponent implements OnInit {
  public forms : IForm[] = [];
  postResult? : IApiResult;
  formData : FormGroup;
  IsLoading : boolean = false;

  constructor(private _userService : FormService,public fb: FormBuilder,private _snackbar: MatSnackBar) { 
    this.formData = this.fb.group({})
  }

  ngOnInit() {
    this._userService.getUsers().subscribe({
      next: res => {
          console.log(res)
          this.forms = res.data;
          let map : {[index:string]: string}={};
          res.data.forEach(element => {
            map[element.fieldName] = element.value
          });
          console.log(map)
          this.formData = this.fb.group(map)
      },
      error: error => {
          console.error('There was an error!', error);
      }
    });
  }


  onClickSubmit() {
    console.log(this.formData.value)
    this.IsLoading = true
    this._userService.postUser(this.formData.value)
    .subscribe({
      next: res => {
          this.IsLoading = false
          this.postResult = res
          console.log(this.postResult);
          this.openSnackBar(res.message,"OK");
      },
      error: error => {
        this.IsLoading = false
          console.error('There was an error!', error);
      }
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackbar.open(message, action);
  }

}
