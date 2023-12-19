import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './dynamic-page.component.html',
  styles: [
  ]
})
export class DynamicPageComponent {

  constructor( private fb: FormBuilder){}

  //Getter para obtener favorite games
  get favoriteGames(){
    return this.dynamicForm.get('favoriteGames') as FormArray;
  }

  public dynamicForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3) ]],
    favoriteGames:this.fb.array([
      ['Metal Gear', Validators.required],
      ['NFMW', Validators.required],
    ]),
  })

  onSubmit(): void{
    
    if(this.dynamicForm.invalid) {

      this.dynamicForm.markAllAsTouched();
      return;
    }

    console.log( this.dynamicForm.value);

    this.dynamicForm.reset
  }
  
}
