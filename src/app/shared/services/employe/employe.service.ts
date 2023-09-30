import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Employe} from "../../../models/employe";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EmployeService {  BASE_URL: string = 'http://localhost:8080/VenteVelos-1.0-SNAPSHOT/api/v1/employes'
  constructor(private http: HttpClient) { }

  addEmploye(employe: Employe): Observable<any>{
    return this.http.post(this.BASE_URL, employe);
  }

  editEmploye(employe: Employe): Observable<any>{
    return this.http.put(this.BASE_URL, employe);
  }

  getEmployeList(): Observable<Employe[]> {
    return this.http.get<Employe[]>(this.BASE_URL);
  }

  getEmployeById(id: string): Observable<Employe>{
    return this.http.get<Employe>(this.BASE_URL + '/' + id);
  }

  deleteEmployeById(id: string): Observable<any>{
    return this.http.delete(this.BASE_URL + '/' + id);
  }
}
