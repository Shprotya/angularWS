import { Component } from '@angular/core';
import { input, inject, signal } from '@angular/core';
import { CarService } from '../features/cars/services/car.service';
import { CarModel } from '../features/cars/models/car.model';
import { LoadState, withLoadState } from '../shared/load-state';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  imports: [RouterLink, MatButtonModule],
  selector: 'app-car-details',
  styleUrl: './car-details.scss',
  templateUrl: './car-details.html',
})
export class CarDetails {
  private carService = inject(CarService);
  readonly id = input.required<string>();
  readonly initial: LoadState<CarModel> = { status: 'loading' };
  private readonly router = inject(Router);
  readonly deleting = signal(false);
  readonly deleteError = signal<string | null>(null);

  deleteCar(car: CarModel): void {
    if (!confirm(`Delete ${car.make} ${car.model}?`)) return;

    this.deleting.set(true);
    this.deleteError.set(null);

    this.carService.deleteCar(this.id()).subscribe({
      next: () => this.router.navigate(['/cars']),
      error: (err: Error) => {
        this.deleteError.set(err.message);
        this.deleting.set(false);
      },
    });
  }



  state = toSignal(
    toObservable(this.id).pipe(
      switchMap((id) => withLoadState(this.carService.getCarById(id))),
    ),
    { initialValue: this.initial },
  );

}