import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClubService, Club } from '../club.service';

@Component({
  selector: 'app-view-club',
  templateUrl: './view-club.component.html',
  styleUrls: ['./view-club.component.css']
})
export class ViewClubComponent {
  constructor(private route:ActivatedRoute,
    private clubService:ClubService,
    private router: Router) { }
  
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
}
