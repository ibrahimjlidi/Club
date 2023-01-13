import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddClubComponent } from './add-club/add-club.component';
import { ClubsComponent } from './clubs/clubs.component';
import { EditClubComponent } from './edit-club/edit-club.component';
import { ViewClubComponent } from './view-club/view-club.component';

const routes: Routes = [
   {path :'', component :ClubsComponent},
   {path:'add-club',component:AddClubComponent},
   {path:'edit-club/:id',component:EditClubComponent},
   {path:'view-club/:id',component:ViewClubComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

