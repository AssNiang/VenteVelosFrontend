export interface articleCommande {
  commande: {
    client: {
      id: number;
      nom: string;
      prenom: string;
      adresse: string;
      code_zip: string;
      email: string;
      etat: string;
      ville: string;
    };
    date_commande: string;
    date_livraison: string;
    employe: {
      id: number;
      nom: string;
      prenom: string;
      email: string;
      telephone: string;
      actif: number;
      magasin: {
        adresse: string;
        code_zip: string;
        email: string;
        etat: string;
        id: number;
        nom: string;
        telephone: string;
        ville: string;
        manager: {
          id: number;
          nom: string;
          prenom: string;
          email: string;
          telephone: string;
          actif: number;
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
        };
      };
    };
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
    numero: number;
    statut: number;
  };
  ligne: number;
  prix_depart: number;
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
  remise: number;
}
