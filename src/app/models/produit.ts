export interface Produit {
  annee_model: number;
  categorie: {
    id: number;
    nom: string;
  };
  id: number;
  marque: {
    id: number;
    nom: string;
  };
  nom: string;
  prix_depart: number;
}
