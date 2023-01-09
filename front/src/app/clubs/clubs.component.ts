import { Component, OnInit } from '@angular/core';
import { ClubService } from 'src/app/club.service';

@Component({
  selector: 'app-clubs',
  templateUrl: './clubs.component.html',
  styleUrls: ['./clubs.component.css'],
  
})



export class ClubsComponent implements OnInit {
 
clubs!:any;
constructor(private clubService :ClubService){}

ngOnInit():void{
 
    this.clubService.getclubs().subscribe(result => {

        this.clubs= result;
        console.log(result)
  
      })
}
deleteClub(id:any){
  this.clubService.delete(id).subscribe(res => {
   this.ngOnInit();
    console.log('Club deleted successfully!');
  })
}
}
