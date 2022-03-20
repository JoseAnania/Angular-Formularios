/* Servicio creado para manejar las validaciones Personalizadas y asincronas */

import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

// creamos una interface para no usar el Tipo de dato Any en la validación asincrona del Usuario
interface ErrorValidate {
  [s: string]: boolean
}

@Injectable({
  providedIn: 'root'
})
export class ValidadoresService {

  constructor() { }

  // validamos que ningún apellido sea Faure 
  noFaure( control: FormControl ): ErrorValidate {

    if(control.value?.toLowerCase()=== 'faure') {

      return {
        noFaure: true
      }
    }
    return null;    
  }

  // método que retornará una función que se ejecutará en el Comoponente (al crear el Formulario)
  passwordsIguales(pass1Name: string, pass2Name: string) {

    return( formGroup: FormGroup ) => {

      const pass1Control = formGroup.controls[pass1Name];
      const pass2Control = formGroup.controls[pass2Name];

      if( pass1Control.value === pass2Control.value) {
        pass2Control.setErrors(null);
      } else {
        pass2Control.setErrors({noEsIgual: true});
      }
    }
  }

  // método de validación asincrona para comprobar que no exista el Usuario (como no usamos BD pondremos de ehemplo LouBizarro como ya cargado)
  existeUsuario( control: FormControl): Promise<ErrorValidate> | Observable<ErrorValidate> {

    // evitar que se dispare la función antes de cargar un Usuario
    if(!control.value) {
      return Promise.resolve(null);
    }

    return new Promise( (resolve, reject) => {

      setTimeout(() => {

        if( control.value === 'LouBizarro') {
          resolve({existe: true});
        } else {
          resolve(null);
        }
        

      }, 3500);
    })
  }
}
