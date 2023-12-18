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
    this.myForm.reset({
       
    })
  }

  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3) ]],
    price:[0, [Validators.required, Validators.min(1)]],
    inStorage:[0, [Validators.required, Validators.min(0)]],
  })

  onSubmit(){

    //No permite que vaya vacío
    if (this.myForm.invalid) return;

    console.log(this.myForm.value);

    //Resetea el formulario, poniendole una cantidad al precio y al almacenaje
    this.myForm.reset({price: 0, inStorage: 0});
    
  }
}

