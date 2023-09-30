import {Component, numberAttribute, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {CommandeService} from "../../shared/services/commande/commande.service";
import {Commande} from "../../models/commande";
import {ProduitService} from "../../shared/services/produit/produit.service";
import {Produit} from "../../models/produit";
import {ArticleCommande} from "../../models/articleCommande";
import {ArticleCommandeService} from "../../shared/services/articleCommande/article-commande.service";

@Component({
  selector: 'app-detail-commande',
  templateUrl: './detail-commande.component.html',
  styleUrls: ['./detail-commande.component.css']
})
export class DetailCommandeComponent implements OnInit{
  // commande_infos!: Commande;
  // commande_id: string = "";
  // produit_infos!: Produit;

  article_commande_id!: string;
  articleCommande!: ArticleCommande;

  // constructor(
  //   private router: Router,
  //   private commandeService: CommandeService,
  //   private produitService: ProduitService) {
  // }
  constructor(
    private router: Router,
    private articleCommandeService: ArticleCommandeService) {
  }

  ngOnInit() {
    // this.commande_id = this.router.url.split(";")[1].split("=")[1];
    // const selected_product_id = this.router.url.split(";")[2].split("=")[1];
    //
    // if(this.commande_id && selected_product_id) {
    //   this.commandeService.getCommandeList().subscribe(
    //     commandes => {
    //       this.commande_infos = commandes.filter(comm => comm.numero == numberAttribute(this.commande_id))[0]
    //     }
    //   );
    //   this.produitService.getProduitList().subscribe(
    //     produits => {
    //       this.produit_infos = produits.filter(prod => prod.id == numberAttribute(selected_product_id))[0];
    //     }
    //   )
    // }
    this.article_commande_id = this.router.url.split(";")[1].split("=")[1];

    if(this.article_commande_id) {
      this.articleCommandeService.getArticleCommandeList().subscribe(
        articleCommandes => {
          this.articleCommande = articleCommandes.filter(artcomm => artcomm.ligne == numberAttribute(this.article_commande_id))[0]
        }
      );
    }
  }
}
