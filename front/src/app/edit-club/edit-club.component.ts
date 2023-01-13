import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, MinLengthValidator, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Club, ClubService } from '../club.service';
import { __param } from 'tslib';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { VirtualTimeScheduler } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';
@Component({
  selector: 'app-edit-club',
  templateUrl: './edit-club.component.html',
  styleUrls: ['./edit-club.component.css']
})
export class EditClubComponent implements OnInit {
  constructor(private route:ActivatedRoute,
    private clubService:ClubService,
    private router: Router,
    private dialogRef:MatDialog
    ) { }
  RegisterForm! : FormGroup;
  submitted = false;
  itemId: number | any= 0;
   club: Club = {
     name: '',
     telephone: 0,
     description: '',
     logo: '',
     createdAt: new Date,
     updatedAt: new Date,
     id: undefined
   };
   Alert:boolean = false;

  ngOnInit(): void {
  
    this.route.paramMap.subscribe((param) => {
      this.itemId = param.get('id') ?? 0;
      this.getById();
    });
  }
  getById(){
    this.clubService.getClubsById(this.itemId).subscribe((data) => {
      this.club.name = data.name;
      this.club.telephone = data.telephone;
      this.club.description = data.description;
      this.club.logo = data.logo;

    })
  }
  update(){
  
    if(this.club.name =='' || this.club.telephone == null || this.club.description == '' || this.club.logo == ''){
    
        this.dialogRef.open(PopupComponent,{ data:{
       
          message: 'Remplissez tous les champs'
      }, 
      height: '300px',
      width: '500px',});
          
        
      
    }
     else{
    this.clubService
    .update(this.itemId, this.club)
    .subscribe(() => {
      this.Alert = true;
    /*   this.router.navigate(['']); */
    });
  }
   }
  closeAlert() {
    this.Alert = false;
  }

  
 
}


