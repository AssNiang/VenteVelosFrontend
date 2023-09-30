export interface Employe {
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
}
