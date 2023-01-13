
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClubsComponent } from './clubs/clubs.component';
import { AddClubComponent } from './add-club/add-club.component';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EditClubComponent } from './edit-club/edit-club.component';
import { ViewClubComponent } from './view-club/view-club.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgConfirmModule  } from 'ng-confirm-box';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModelComponent } from './model/model.component';  
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { PopupComponent } from './popup/popup.component';


@NgModule({
  declarations: [
    AppComponent,
    ClubsComponent, 
    AddClubComponent, EditClubComponent, ViewClubComponent, ModelComponent, PopupComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgConfirmModule,
    NgbModule,
    MatDialogModule,
    MatButtonModule
    

    
  
    
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
