import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { ClubService } from '../club.service';

@Component({
  selector: 'app-add-club',
  templateUrl: './add-club.component.html',
  styleUrls: ['./add-club.component.css']
})
export class AddClubComponent {
  RegisterForm!:FormGroup
  submitted = false;
  constructor(private formBuilder :FormBuilder,
    private router:Router,
    private clubService:ClubService){  }

 
  ngOnInit(){
    this.RegisterForm=this.formBuilder.group({
      Name:['',[Validators.required,Validators.minLength(4)]],
      Telephone:['',[Validators.required,Validators.minLength(8),Validators.pattern("^[0-9]{8,15}$")]],
      Description:['',Validators.required],
      logo:['',Validators.required],
    
    })
  }
onSubmit(){
  this.submitted=true
  if (this.RegisterForm.invalid){
    return alert('invaild formulaire')
  }
  this.clubService.register(this.RegisterForm.value).pipe(
    map(club=> this.router.navigate([''])),
  ).subscribe();
  
}
  

}
