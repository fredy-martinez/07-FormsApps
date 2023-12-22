import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './dynamic-page.component.html',
  styles: [
  ]
})
export class DynamicPageComponent {

  constructor( private fb: FormBuilder){}

  //Declaro el reactive form con sus validaciones
  public dynamicForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3) ]],
    favoriteGames:this.fb.array([
      ['Metal Gear', Validators.required],
      ['NFMW', Validators.required],
    ]),
  })

  //Getter para obtener favorite games
  get favoriteGames(){
    return this.dynamicForm.get('favoriteGames') as FormArray;
  }

  //Getter del error
  getFieldError( field: string): string | null{

    //Si no existe el campo
    if( !this.dynamicForm.controls[field]) return null;

    const errors = this.dynamicForm.controls[field].errors || {};

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
      return this.dynamicForm.controls[field].errors && this.dynamicForm.controls[field].touched;
    }

    //Validación del arreglo
    isValidFieldInArray( formArray: FormArray, i: number){
      return formArray.controls[i].errors 
          && formArray.controls[i].touched;

    }


  onSubmit(): void{
    
    if(this.dynamicForm.invalid) {

      this.dynamicForm.markAllAsTouched();
      return;
    }

    console.log( this.dynamicForm.value);

    this.dynamicForm.reset();
  }
  
}
