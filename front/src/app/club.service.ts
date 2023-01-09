import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';



export interface Club{
id: any;
  name?:string;
  telephone?:number;
  description?:string;
  logo?:string;
  imageName?:string;
  createdAt:Date;
  updatedAt:Date;
 
}

@Injectable({
  providedIn: 'root'
})


export class ClubService {

  private club: Club = {
    name: '',
    telephone: 0,
    description: '',
    logo: '',
    imageName:'',
    createdAt: new Date,
    updatedAt: new Date,
    id: undefined
  }
  constructor(private http:HttpClient) { }

  getclubs():Observable<any>{
    return this.http.get<any>('http://localhost:8000/club/');

  }
  getClubsById(id:any){
    return this.http.get<Club>(`http://localhost:8000/club/${id}`)
  }
  register(club: any){

    return this.http.post<any>('http://localhost:8000/club/new',club).pipe(
      map(club=>club)
  )
   }
   update(id: number, club: Club){
    return this.http.put(`http://localhost:8000/club/edit/${id}`,club);
  }
   delete(id:any):Observable<any>{
    return this.http.delete<any>(`http://localhost:8000/club/${id}`);

  }
  
}
