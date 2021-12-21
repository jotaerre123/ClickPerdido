import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { catchError, map, Observable, of } from 'rxjs';
import { Categorias } from 'src/app/models/interfaces/categoria.interface';
import ListaFirebaseDto from 'src/app/models/interfaces/listas-firebases.dto';
import { CategoriaServiceService } from 'src/app/services/categoria-service.service';

@Component({
  selector: 'app-object-form',
  templateUrl: './object-form.component.html',
  styleUrls: ['./object-form.component.css']
})
export class ObjectFormComponent implements OnInit {

  Categorias!: Categorias[];
  listasList!: ListaFirebaseDto[];
  objetoNew!: string[];
  apiLoaded: Observable<boolean>;
  address: string = '';
  

  id: string[] = [];
  descripcion: string[] = [];
  fundacionDonBoscoLatLng: google.maps.LatLngLiteral = {lat: 37.36133765325532, lng: -5.964321690581096};
  markerOptions: google.maps.MarkerOptions = {
    draggable: true
  };
  tipo!:string;
  location!: google.maps.LatLngLiteral;


  constructor(private firestore: AngularFirestore, private categoria: CategoriaServiceService, private httpClient: HttpClient) {
    this.apiLoaded = httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=AIzaSyByNlJfkMKkavCkpc9KMY0Wf5fASr4OOic', 'callback')
        .pipe(
          map(() => true),
          catchError(() => of(false)),
        );
   }

  ngOnInit(): void {
    console.log(this.getCategorias());
    this.getCategorias();
  }

  searchAddress(){
    let geocoder = new google.maps.Geocoder();
    geocoder.geocode( { 'address' : this.address}, function(results,status){
      if(status == google.maps.GeocoderStatus.OK){
        if(results && results?.length > 0) {
          let localizacion = results![0];
          localStorage.setItem('lng',localizacion.geometry.location.lng().toString())
          localStorage.setItem('lat',localizacion.geometry.location.lat().toString())
        }else{
          alert('Direccion no encontrada')
        }
      }
    });
    console.log(geocoder)
    console.log(this.address)
  }

  updateLocationMarker(event: google.maps.MapMouseEvent) {
    console.log(`${event.latLng?.lat()} , ${event.latLng?.lat()}`);
    localStorage.setItem('location',`${event.latLng?.lat()},${event.latLng?.lat()}`)
  }

  getCategorias(): void {
    this.categoria.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.listasList = data;
    });
  }

  crearObjeto(){
    let id = localStorage.getItem('uid')
    let lat = Number(localStorage.getItem('lat'));
    let lng = Number(localStorage.getItem('lng'))
    this.location = {lat: lat, lng: lng}
    console.log(this.location)
  this.firestore.collection(`users/${id}/${this.tipo}`).add({
    name: this.objetoNew,
    categoria: this.id,
    descripcion: this.descripcion,
    location: this.location,
});
  

}}

