import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CarModel } from '../features/cars/models/car.model';
import { CarService } from '../features/cars/services/car.service';
import { Router } from '@angular/router';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-car-form',
  styleUrl: './car-form.scss',
  templateUrl: './car-form.html',
})
export class CarForm {
  private formBuilder = inject(FormBuilder);
  private carService = inject(CarService);
  private router = inject(Router);

  carForm = this.formBuilder.group({
    make: ['', Validators.required],
    model: ['', Validators.required],
    year: ['']
  });

  onSubmit(): void {
    const carData: CarModel = this.carForm.value as CarModel;
    console.log('Submitted Car:', carData);

    this.carService.addCar(carData).subscribe({
      next: (response) => {
        console.log('Car added successfully:', response);
        this.router.navigate(['/cars']);
      },
      error: (error) => {
        console.error('Error adding car:', error);
      }
    });
  }
}
