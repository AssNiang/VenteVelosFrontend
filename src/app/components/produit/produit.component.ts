import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { ProduitService } from "../../shared/services/produit/produit.service";
import { Produit } from "../../models/produit";
import {Subject} from "rxjs";
import {MatSort, Sort} from "@angular/material/sort";
import {LiveAnnouncer} from "@angular/cdk/a11y";


@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css']
})
export class ProduitComponent implements AfterViewInit {
  data: {}[] = [];
  displayedColumns: string[] = ['numero', 'nom', 'categorie', 'marque', 'annee modele', 'prix depart', 'commander'];
  dataSource = new MatTableDataSource<{}>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataReadySubject = new Subject<void>();

  constructor(private produitService: ProduitService, private _liveAnnouncer: LiveAnnouncer) {
  }

  getData() {
    this.produitService.getProduitList().subscribe((produits) => {
      console.log("get data ...");
      this.data = produits.map((produit) => ({
        numero: produit.id,
        nom: produit.nom,
        categorie: produit.categorie.nom,
        marque: produit.marque.nom,
        annee_model: produit.annee_model,
        prix_depart: produit.prix_depart,
      }));
      this.dataSource = new MatTableDataSource(this.data);

      // Emit the signal when data is ready
      this.dataReadySubject.next();
    });
  }

  ngAfterViewInit() {
    console.log("ngAfterViewInit");
    this.dataReadySubject.subscribe(() => {
      // This code will execute after data is ready
      console.log("data is ready");
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    // Trigger the data retrieval
    this.getData();
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }


  orderProduct({element}: { element: any }) {
    console.log(element);
    //-----------------------------------------------------------------------------------------------------
    // open a pop and ask him to fullfill the remaining fields (https://jacobnarayan.com/blogs/how-to-easily-create-a-popup-with-angular-material)
      // like magasin plus proche (disposant du produit == stock non vide)
      // date livraision
      // infos client
        // if not already a client
          // add him in the list of clients
        // else
          // select him
    // once completed, print out the details of his order (articleCommande by him)
      // he has the possibility to remove it.

    //-----------------------------------------------------------------------------------------------------
    // pages pour la navigation: list of "categories", "brands", "products", "ordered items"

    //-----------------------------------------------------------------------------------------------------
    // add column in the list of products to show the state of the stock (sum in all shops by product)
    // tell to the visitor that it is possible to sort products by column name using modals (https://blog.hubspot.com/website/add-bootstrap-to-angular-2)

  }
}
