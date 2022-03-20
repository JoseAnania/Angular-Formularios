import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaisService } from 'src/app/services/pais.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  /* creamos la propiedad objeto del usuario y del País*/
  usuario = {
    nombre: '',
    apellido: '',
    correo: '',
    pais: '',
    genero: ''
  }

  paises: any[] = [];

  /* inyectamos el servicio de Países para poder usarlo */
  constructor( private paisService: PaisService ) { }

  /* aquí se hace la petición Http para traer la info del endpoint de la Api */
  ngOnInit(): void {

    this.paisService.getPaises().subscribe( paises => {
      
      this.paises = paises;

      this.paises.unshift({
        nombre: '[Seleccione Pais]',
        codigo: ''
      })
    });
  }

  /* creamos el Método para guardar el formulario*/
  guardar( forma: NgForm ) {

    /* validamos */
    if( forma.invalid ) {

      Object.values(forma.controls).forEach(control => {
     
        control.markAsTouched();
      });
      return;
    }
    console.log( forma.value );
  }
}
