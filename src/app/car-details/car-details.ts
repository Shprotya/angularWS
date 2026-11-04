import { Component } from '@angular/core';
import { input, inject, signal } from '@angular/core';
import { CarService } from '../features/cars/services/car.service';
import { CarModel } from '../features/cars/models/car.model';
import { LoadState, withLoadState } from '../shared/load-state';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';

@Component({
  imports: [],
  selector: 'app-car-details',
  styleUrl: './car-details.scss',
  templateUrl: './car-details.html',
})
export class CarDetails {

  private carService = inject(CarService);

  readonly id = input.required<string>();

  readonly initial: LoadState<CarModel> = { status: 'loading' };

  state = toSignal(
    toObservable(this.id).pipe(
      switchMap((id) => withLoadState(this.carService.getCarById(id))),
    ),
    { initialValue: this.initial },
  );

}