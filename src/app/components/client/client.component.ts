import {booleanAttribute, Component, numberAttribute, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {Client} from "../../models/client";
import {Router} from "@angular/router";
import {ClientService} from "../../shared/services/client/client.service";
import {CommandeService} from "../../shared/services/commande/commande.service";
import {Commande} from "../../models/commande";
import {StockService} from "../../shared/services/stock/stock.service";
import {EmployeService} from "../../shared/services/employe/employe.service";
import {ArticleCommande} from "../../models/articleCommande";
import {ArticleCommandeService} from "../../shared/services/articleCommande/article-commande.service";
import {ProduitService} from "../../shared/services/produit/produit.service";


@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent {

  prenom = new FormControl('', [Validators.required, Validators.min(3)]);
  nom = new FormControl('', [Validators.required, Validators.min(3)]);
  telephone = new FormControl('', [Validators.required, Validators.min(9)]);
  email = new FormControl('', [Validators.required, Validators.email]);
  adresse = new FormControl('', [Validators.required, Validators.min(2)]);
  ville = new FormControl('', [Validators.required, Validators.min(2)]);
  etat = new FormControl('', [Validators.required, Validators.min(2)]);
  codeZip = new FormControl('', [Validators.required, Validators.min(4)]);

  // quantity: string = "";
  // selected_product_id: string = "";
  private commande_infos: any;

  constructor(
    private router: Router,
    private clientService: ClientService,
    private commandeService: CommandeService,
    private stockService: StockService,
    private employeService: EmployeService,
    private articleCommandeService: ArticleCommandeService,
    private produitService: ProduitService) {
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  validForm(): boolean {
    return booleanAttribute(
      this.prenom.valid &&
      this.nom.valid &&
      this.email.valid &&
      this.telephone.valid &&
      this.email.valid &&
      this.adresse.valid &&
      this.etat.valid &&
      this.codeZip
    )
  }

  formatToJavaDate(date: Date): string {
    const year = date.getUTCFullYear();
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // Month is zero-based, so add 1
    const day = date.getUTCDate().toString().padStart(2, '0');
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const seconds = date.getUTCSeconds().toString().padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z[UTC]`;
  }

  save() {
    const quantity = this.router.url.split(";")[1].split("=")[1];
    const selected_product_id = this.router.url.split(";")[2].split("=")[1];

    if (this.validForm()) {
      console.log("adding client data");

      // get the number of clients in the db
      this.clientService.getClientList().subscribe(
        listClients => {

          // declare a client object
          const client: Client = {
            id: listClients.length + 1,
            prenom: this.prenom.getRawValue() + '',
            nom: this.nom.getRawValue() + '',
            telephone: this.telephone.getRawValue() + '',
            email: this.email.getRawValue() + '',
            adresse: this.adresse.getRawValue() + '',
            ville: this.ville.getRawValue() + '',
            etat: this.etat.getRawValue() + '',
            code_zip: this.codeZip.getRawValue() + ''
          };

          // adding client
          this.clientService.addClient(client).subscribe(
            message => console.log(message)
          );

          // get the number of orders in the db.
          this.commandeService.getCommandeList().subscribe(
            listCommades => {

              // get the stocks
              this.stockService.getStockList().subscribe(
                stocks => {
                  const first_mag_with_prod = stocks.filter(stock => stock.produit.id == numberAttribute(selected_product_id))[0];

                  // get an employee from the selected shop
                  this.employeService.getEmployeList().subscribe(
                    employees => {
                      const employee = employees.filter(emp => emp.magasin.id == first_mag_with_prod.magasin.id)[0];

                      // define order object
                      const now = new Date();
                      const commande: Commande = {
                        numero: listCommades.length + 1,
                        client: client,
                        statut: 1,
                        date_commande: this.formatToJavaDate(now),
                        date_livraison: this.formatToJavaDate(now),
                        magasin: first_mag_with_prod.magasin,
                        employe: employee,
                      }

                      // add an order
                      this.commandeService.addCommande(commande).subscribe(
                        message => {

                          // get number of orderItems
                          this.articleCommandeService.getArticleCommandeList().subscribe(
                            listArticleCommandes => {

                              // get the selected product
                              this.produitService.getProduitList().subscribe(
                                products => {
                                  const selectedProduct = products.filter(prod => prod.id == numberAttribute(selected_product_id))[0];
                                  // define orderedItem object
                                  const articleCommande: ArticleCommande = {
                                    ligne: listArticleCommandes.length + 1,
                                    commande: commande,
                                    produit: selectedProduct,
                                    quantite: numberAttribute(quantity),
                                    remise: 0,
                                    prix_depart: selectedProduct.prix_depart * numberAttribute(quantity),
                                  }

                                  // add orderedItem
                                  this.articleCommandeService.addArticleCommande(articleCommande).subscribe(
                                    message => {
                                      console.log(message)

                                      // pass the command id to detailCommande component
                                      this.router.navigate(["/detailCommande", {
                                        numeroArticleCommande: articleCommande.ligne,
                                        // numeroCommande: commande.numero,
                                        // numeroProduit: selected_product_id
                                      }]);
                                    }
                                  )

                                }
                              )

                            }
                          )

                        }
                      );
                    }
                  )
                }
              )
            }
          );
        }
      );

    } else {
      console.log("Some errors ...");
    }

  }
}
