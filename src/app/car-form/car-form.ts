import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CarModel } from '../features/cars/models/car.model';

@Component({
  imports: [],
  selector: 'app-car-form',
  styleUrl: './car-form.scss',
  templateUrl: './car-form.html',
})
export class CarForm {
  private formBuilder = inject(FormBuilder);

  carForm = this.formBuilder.group({
    make: ['', Validators.required],
    model: ['', Validators.required],
    year: ['']
  });

  onSubmit(): void {
    const carData: CarModel = this.carForm.value as CarModel;
    console.log('Submitted Car:', carData);

  }

}
