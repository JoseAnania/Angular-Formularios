/* Servicio creado para manejar la info de la API de Países */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  /* inyectamos el servicio del HttpClientModule */
  constructor( private http: HttpClient ) { }

  /* creamos un método para llamar a los países desde el EndPoint de la API (más un Pipe para no traer todo sino sólo lo que nos importa)*/
  getPaises() {

    return this.http.get('https://restcountries.com/v2/lang/es')
               .pipe( map ( paises => {
                 return Object.values( paises ).map( pais => ({ nombre: pais.name, codigo: pais.alpha3Code })
                 )
               })
               ); 
  }
}
