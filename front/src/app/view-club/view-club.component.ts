import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgConfirmService } from 'ng-confirm-box';
import { ClubService, Club } from '../club.service';

@Component({
  selector: 'app-view-club',
  templateUrl: './view-club.component.html',
  styleUrls: ['./view-club.component.css']
})
export class ViewClubComponent {
  constructor(private route:ActivatedRoute,
    private clubService:ClubService,
    private router: Router
    ,private confirmService: NgConfirmService) { }
    clubs!:any;
  itemId: number | any= 0;
  itemName :string | any='';
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
     this.itemName = param.get('name') ?? '';
     this.getById();
     console.log('lol',this.itemId,this.itemName)
   });
 }
 getById(){
   this.clubService.getClubsByIdName(this.itemId, this.itemName).subscribe((data) => {
     this.club.name = data.name;
     this.club.telephone = data.telephone;
     this.club.description = data.description;
     this.club.logo = data.logo;

   })
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
