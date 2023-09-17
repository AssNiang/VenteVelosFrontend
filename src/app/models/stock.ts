export interface Stock {
  magasin: {
    adresse: string;
    code_zip: string;
    email: string;
    etat: string;
    id: number;
    nom: string;
    telephone: string;
    ville: string;
  };
  produit: {
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
  };
  quantite: number;
}
