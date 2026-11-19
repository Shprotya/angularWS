import { Component, OnInit, computed, inject, input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CarModel, CreateCarDto } from '../features/cars/models/car.model';
import { CarService } from '../features/cars/services/car.service';
import { Router, RouterLink } from '@angular/router';
import { signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { notBlank } from '../shared/validators/not-blank.validator';

@Component({
  imports: [ReactiveFormsModule,
    RouterLink,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatProgressBarModule
  ],
  selector: 'app-car-form',
  styleUrl: './car-form.scss',
  templateUrl: './car-form.html',
})
export class CarForm implements OnInit {
  // Filled from the route parameter on 'cars/:id/edit'; undefined on 'cars/new'
  readonly id = input<string>();
  readonly isEdit = computed(() => !!this.id());
  loadError = signal<string | null>(null);

  private formBuilder = inject(FormBuilder);
  private carService = inject(CarService);
  private router = inject(Router);
  saving = signal(false);
  saveError = signal<string | null>(null);
  readonly currentYear = new Date().getFullYear();
  private snackBar = inject(MatSnackBar);

  carForm = this.formBuilder.nonNullable.group({
    make: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30), notBlank]],
    model: ['', [Validators.required, Validators.maxLength(30), notBlank]],
    year: this.formBuilder.control<number | null>(null, [Validators.min(1950), Validators.max(this.currentYear + 1),]),
  });

  ngOnInit(): void {
    const id = this.id();
    if (!id) {
      return;
    }

    // Edit mode: load the existing car and put its values into the form
    this.carForm.disable();
    this.carService.getCarById(id).subscribe({
      next: (car) => {
        this.carForm.patchValue({ make: car.make, model: car.model, year: car.year ?? null });
        this.carForm.enable();
      },
      error: (err: Error) => this.loadError.set(err.message),
    });
  }

  onSubmit(): void {
    const { make, model, year } = this.carForm.getRawValue();
    const car: CreateCarDto = { make, model, year: year ?? undefined };
    const id = this.id();

    this.saving.set(true);
    this.saveError.set(null);
    this.carForm.disable();

    const request = id ? this.carService.updateCar(id, car) : this.carService.addCar(car);

    request.subscribe({
      next: (response) => {
        this.snackBar.open(`${car.make} ${car.model} ${id ? 'updated' : 'saved'}`, 'Close', { duration: 10000 });
        console.log('Car saved successfully:', response);
        this.router.navigate(id ? ['/cars', id] : ['/cars']);
      },
      error: (err: Error) => {
        this.saveError.set(err.message);
        this.saving.set(false);
        this.carForm.enable();
      },
    });
  }

}
