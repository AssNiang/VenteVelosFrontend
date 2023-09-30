import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {ProduitComponent} from "./components/produit/produit.component";

import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import {AppRoutingModule} from "./app-routing.module";
import { ClientComponent } from './components/client/client.component';
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";
import { AccueilComponent } from './components/accueil/accueil.component';
import { CategorieComponent } from './components/categorie/categorie.component';
import { MarqueComponent } from './components/marque/marque.component';
import { DetailCommandeComponent } from './components/detail-commande/detail-commande.component';

@NgModule({
  declarations: [
    AppComponent,
    ProduitComponent,
    ClientComponent,
    AccueilComponent,
    CategorieComponent,
    MarqueComponent,
    DetailCommandeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    HttpClientModule,
    FormsModule,
    MatSortModule,
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    MatCardModule,
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
