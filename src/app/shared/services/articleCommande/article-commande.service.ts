import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ArticleCommande} from "../../../models/articleCommande";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ArticleCommandeService {
  BASE_URL: string = 'http://localhost:8080/VenteVelos-1.0-SNAPSHOT/api/v1/articleCommandes'
  constructor(private http: HttpClient) { }

  addArticleCommande(articleCommande: ArticleCommande): Observable<any>{
    return this.http.post(this.BASE_URL, articleCommande);
  }

  editArticleCommande(articleCommande: ArticleCommande): Observable<any>{
    return this.http.put(this.BASE_URL, articleCommande);
  }

  getArticleCommandeList(): Observable<ArticleCommande[]> {
    return this.http.get<ArticleCommande[]>(this.BASE_URL);
  }

  getArticleCommandeById(ligne: string, numCommande: string): Observable<ArticleCommande>{
    return this.http.get<ArticleCommande>(this.BASE_URL + '/' + ligne + '_' + numCommande);
  }

  deleteArticleCommandeById(ligne: string, numCommande: string) : Observable<any>{
    return this.http.delete(this.BASE_URL + '/' + ligne + '_' + numCommande);
  }
}
