import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ClientComponent} from "./components/client/client.component";
import {ProduitComponent} from "./components/produit/produit.component";
import {AccueilComponent} from "./components/accueil/accueil.component";
import {CategorieComponent} from "./components/categorie/categorie.component";
import {MarqueComponent} from "./components/marque/marque.component";
import {DetailCommandeComponent} from "./components/detail-commande/detail-commande.component";

export const routes: Routes = [
  { path: '', redirectTo:'accueil', pathMatch:'full' },
  { path: "accueil", component: AccueilComponent },
  { path: "listProducts", component: ProduitComponent },
  { path: "addClient", component: ClientComponent },
  { path: "listCategories", component: CategorieComponent },
  { path: "listMarques", component: MarqueComponent },
  { path: "detailCommande", component: DetailCommandeComponent },

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
