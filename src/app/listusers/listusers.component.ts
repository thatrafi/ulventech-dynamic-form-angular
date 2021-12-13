import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder } from '@angular/forms';
import { IApiResult } from '../ApiResult';
import { IForm } from '../form';
import { FormService } from '../form.service';
import { IFormRequest} from '../FormRequest';

@Component({
  selector: 'app-listusers',
  templateUrl: './listusers.component.html',
  styleUrls: ['./listusers.component.css']
})
export class ListusersComponent implements OnInit {
  public forms : IForm[] = [];
  postResult? : IApiResult;
  formData : FormGroup;

  constructor(private _userService : FormService,public fb: FormBuilder) { 
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
    this._userService.postUser(this.formData.value)
    .subscribe({
      next: res => {
          this.postResult = res
          console.log(this.postResult)
      },
      error: error => {
          console.error('There was an error!', error);
      }
    });
  }

}
