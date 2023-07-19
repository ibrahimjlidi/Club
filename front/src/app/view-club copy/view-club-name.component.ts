import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgConfirmService } from 'ng-confirm-box';
import { ClubService, Club } from '../club.service';

@Component({
  selector: 'app-view-club-name',
  templateUrl: './view-club-name.component.html',
  styleUrls: ['./view-club-name.component.css']
})
export class ViewClubNameComponent {
  constructor(private route:ActivatedRoute,
    private clubService:ClubService,
    private router: Router
    ,private confirmService: NgConfirmService) { }
    club!:any;
  itemId: number | any= 0;
  itemName :string | any='';
/*   club: Club = {
    name: '',
    telephone: 0,
    description: '',
    logo: '',
    createdAt: new Date,
    updatedAt: new Date,
    id: undefined
  }; */

 ngOnInit(): void {
 
   this.route.paramMap.subscribe((param) => {
   this.itemId = param.get('id') ?? 0;
     this.itemName = param.get('name') ?? '';
     this.getById();
    
    
  
   });
 }
 getById(){
   this.clubService.getClubsByIdName(this.itemId,this.itemName).subscribe(
    club => {
      // handle success, for example by updating a component property
      this.club = club;
    },
    error => {
      // handle error, for example by displaying a message to the user
      console.error(error);
    }
  );
    /*  this.club.name = data.name;
     this.club.telephone = data.telephone;
     this.club.description = data.description;
     this.club.logo = data.logo; */

  
 }
 deleteClub(id:any){

  this.confirmService.showConfirm('Voulez-vous vraiment supprimer ce club ?',
  ()=>{
    this.clubService.delete(id).subscribe(res => {
      this.router.navigate(['']);
       console.log('Club deleted successfully!');
     })
  },
 ()=>{

 }
 )
}
}
