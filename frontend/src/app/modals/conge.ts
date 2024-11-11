
import { User } from './user';

export class Conge {
      idCong:number;
	  typeCong:String;
	  debutCong:Date;
	  finCong:Date;
	  createdAt:String;
	  description:String;
	  duree: String; 
	  soldeConge: number;
	  statusOfDemand: boolean;
	  idUser:number;
	  user: User;
}