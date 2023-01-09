import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Club, ClubService } from '../club.service';
import { __param } from 'tslib';
@Component({
  selector: 'app-edit-club',
  templateUrl: './edit-club.component.html',
  styleUrls: ['./edit-club.component.css']
})
export class EditClubComponent implements OnInit {
  constructor(private route:ActivatedRoute,
    private clubService:ClubService,
    private router: Router) { }
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
    this.clubService
    .update(this.itemId, this.club)
    .subscribe(() => {
      this.router.navigate(['']);
    });
  }
 
}


