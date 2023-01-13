import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { ClubService } from '../club.service';

@Component({
  selector: 'app-add-club',
  templateUrl: './add-club.component.html',
  styleUrls: ['./add-club.component.css']
})
export class AddClubComponent implements OnInit{
 
    registerForm!: FormGroup;
    submitted = false;
    title = 'angularvalidate';
    constructor(
      private clubService: ClubService,
      private router: Router,
      private formBuilder: FormBuilder
    ) { }
    Alert:boolean = false;
    ngOnInit(): void {
      this.registerForm = this.formBuilder.group({
        name:['',[Validators.required,Validators.minLength(6)]],
        phone:['',[Validators.required,Validators.minLength(8),Validators.pattern("^[0-9]{8,15}$")]],
        logo:['',[Validators.required,Validators.minLength(10)]],
        description:['',[Validators.required,Validators.minLength(6)]],
        
      })
    }
    onSubmit(){
      this.submitted=true
      if(this.registerForm.invalid){
       return;
      }
      this.clubService.register(this.registerForm.value).subscribe(
        data => {
          this.Alert = true;
          this.registerForm.reset({})
        }
      )
    }
    closeAlert() {
      this.Alert = false;
    }
  }
