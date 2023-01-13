import { Component, OnInit } from '@angular/core';
import { ConfirmBoxInitializer, DialogLayoutDisplay } from '@costlydeveloper/ngx-awesome-popup';
import { NgConfirmService } from 'ng-confirm-box';
import { ClubService } from 'src/app/club.service';
import { MatDialog} from '@angular/material/dialog';
import { ModelComponent } from '../model/model.component';
import { ContentRef } from '@ng-bootstrap/ng-bootstrap/util/popup';

@Component({
  selector: 'app-clubs',
  templateUrl: './clubs.component.html',
  styleUrls: ['./clubs.component.css'],
  
})



export class ClubsComponent implements OnInit {
 url="https://cdn.worldvectorlogo.com/logos/club-africain.svg";
clubs!:any;
club: any;

constructor(private clubService :ClubService
  ,private confirmService: NgConfirmService,
  private dialog: MatDialog,
  piublic :MatDialog
  

  ){}
 
ngOnInit():void{
 this.reset()

}

	


deleteClub(id:any){

  this.confirmService.showConfirm('Voulez-vous vraiment supprimer ce club ?',
  ()=>{
    this.clubService.delete(id).subscribe(res => {
      this.reset();
       console.log('Club deleted successfully!');
     })
  },
 ()=>{

 }
 )

 


}
reset(){
  this.clubService.getclubs().subscribe(result => {

    this.clubs= result;
    console.log(result)

  })
}
openDialog(id:number) {
  
  
  const dialogRef = this.dialog.open(ModelComponent,{
  data:{
   
      message: 'Do you want to delete the product and the associated licenses?'
  }, 
  height: '400px',
  width: '600px',
  
  
  });
   
  dialogRef.afterClosed().subscribe((confirmed: boolean) => {
    
      if (confirmed) {
        this.clubService.delete(id).subscribe(res => {
          this.reset();
           console.log('Club deleted successfully!');
         })
      }
  });
  dialogRef.afterClosed().subscribe((confirmed: boolean) => {
    if (confirmed) {
      
    }
  });
} 
}
