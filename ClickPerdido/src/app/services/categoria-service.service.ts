import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Categorias} from '../models/interfaces/categoria.interface'
import ListaFirebaseDto from '../models/interfaces/listas-firebases.dto';

@Injectable({
  providedIn: 'root'
})
export class CategoriaServiceService {


  listasRef!: AngularFirestoreCollection<ListaFirebaseDto>;

  constructor(private http: HttpClient, private firestore: AngularFirestore) {
    this.listasRef = this.firestore.collection(`categoria`);
   }

   getAll(): AngularFirestoreCollection<ListaFirebaseDto> {
    return this.listasRef;
  }

}
