import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-basic-page',
  templateUrl: './basic-page.component.html',
  styles: [
  ]
})
export class BasicPageComponent implements OnInit{

  constructor( private fb: FormBuilder){}

  ngOnInit(): void {
    this.myForm.reset({ price: 0, inStorage: 0 })
  }

  //getter del error
  getFieldError( field: string): string | null{

    //Si no existe el campo
    if( !this.myForm.controls[field]) return null;

    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch( key ){
        case 'required':
          return 'Este campo es requerido'

        case 'minlength':
          return `Mínimo  ${ errors['minlength'].requiredLength} caracteres`
      }
    }
    return null;
  }

  //Validación
  isValidField( field: string): boolean | null {
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched;
  }

  
  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3) ]],
    price:[0, [Validators.required, Validators.min(1)]],
    inStorage:[0, [Validators.required, Validators.min(0)]],
  })

  onSubmit(): void{ 

    //No permite que vaya vacío
    if ( this.myForm.invalid ) {      
      //Al presionar guardar dispara las validaciones, or si un campo esta vacío
      this.myForm.markAllAsTouched();
      return;
    }

    console.log(this.myForm.value);

    //Resetea el formulario, poniendole una cantidad al precio y al almacenaje
    this.myForm.reset({price: 0, inStorage: 0});
    
  }
}

