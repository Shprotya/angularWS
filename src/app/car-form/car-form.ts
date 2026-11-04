import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CarModel, CreateCarDto } from '../features/cars/models/car.model';
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

  carForm = this.formBuilder.nonNullable.group({
    make: ['', Validators.required],
    model: ['', Validators.required],
    year: this.formBuilder.control<number | null> (null)
  });

  onSubmit(): void {
    const {make, model, year} = this.carForm.getRawValue();
    const carData: CreateCarDto = { make, model, year: year ?? undefined }; // Convert null to undefined for optional field

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
