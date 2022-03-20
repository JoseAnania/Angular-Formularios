import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidadoresService } from 'src/app/services/validadores.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  // creamos un parámetro que referencia al formulario
  forma!: FormGroup;

  // inyectamos el servicio FormBuilder (ayuda a la configuración del formulario) y el Servicio de validaciones personalizadas
  constructor( private fb: FormBuilder,
               private validadores: ValidadoresService) {

    // llamamos al método de creación del formulario
    this.crearFormulario();

    // llamamos al método que carga info al formulario
    this.cargarFormulario();
   }

  ngOnInit(): void {
  }

  // métodos "get" para marcar con rojo si falla alguna validación
  get nombreNoValido() {
    return this.forma.get('nombre')?.invalid && this.forma.get('nombre')?.touched;
  }
  get apellidoNoValido() {
    return this.forma.get('apellido')?.invalid && this.forma.get('apellido')?.touched;
  }
  get correoNoValido() {
    return this.forma.get('correo')?.invalid && this.forma.get('correo')?.touched;
  }
  get distritoNoValido() {
    return this.forma.get('direccion.distrito')?.invalid && this.forma.get('direccion.distrito')?.touched;
  }
  get ciudadNoValido() {
    return this.forma.get('direccion.ciudad')?.invalid && this.forma.get('direccion.ciudad')?.touched;
  }
  // método "get" para el Arreglo de Pasatiempos (donde lo definimos como Array para el Html en NgFor)
  get pasatiempos() {
    return this.forma.get('pasatiempos') as FormArray;
  }
  // métodos "get" para validar las contraseñas (pass2 debe ser igual al pass1)
  get pass1NoValido() {
    return this.forma.get('pass1')?.invalid && this.forma.get('pass1')?.touched;
  }
  get pass2NoValido() {
    const pass1 = this.forma.get('pass1').value;
    const pass2 = this.forma.get('pass2').value;

    return ( pass1 === pass2 ) ? false : true;
  }
  // método "get" para validación del Usuario
  get usuarioNoValido() {
    return this.forma.get('usuario')?.invalid && this.forma.get('usuario')?.touched;
  }

  // método de creación del formulario (y sus validaciones)
  crearFormulario() {
    this.forma = this.fb.group({

      nombre: ['', [Validators.required, Validators.minLength(4)]],
      apellido: ['', [Validators.required, Validators.minLength(5), this.validadores.noFaure]],
      correo: ['', [Validators.required, Validators.email]],
      pass1: ['', [Validators.required]],
      pass2: ['', [Validators.required]],
      usuario: ['', , [this.validadores.existeUsuario]], //tercer posición porque es una validación asincrona
      // tratamos a la dirección como un objeto 
      direccion: this.fb.group({
        distrito: ['', [Validators.required]],
        ciudad: ['', [Validators.required]],
      }), 
      // tratamos los pasatiempos como un arreglo
      pasatiempos: this.fb.array([])
    }, {
      // definimos una función validador para las contraseñas (se llama desde el servicio validadores)
      validators: this.validadores.passwordsIguales('pass1', 'pass2')
    });
  }

  // método que carga data automáticamente en el formulario (establecer un objeto al formulario)
  cargarFormulario() {
    
    this.forma.reset({
        nombre: "José",
        apellido: "Anania",
        correo: "joseanania@gmail.com",
        direccion: {
        distrito: "Córdoba",
        ciudad: "Córdoba"
        }
    });
  }

  // método para agregar Pasatiempos
  agregarPasatiempo() {

    this.pasatiempos.push( this.fb.control('', Validators.required) );
  }

  // método para eliminar Pasatiempos
  borrarPasatiempo(i: number) {
    this.pasatiempos.removeAt(i);
  }

  // método para guardar el formulario
  guardar() {

    console.log( this.forma );

    /* validamos */
    if( this.forma.invalid ) {

      return Object.values(this.forma.controls).forEach(control => {
     
        control.markAllAsTouched();
      });
    }

    // reseteamos el formulario
    this.forma.reset();
  }
}
