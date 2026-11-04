import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { CarService } from '../../services/car.service';
import { AsyncPipe } from '@angular/common';
import { CarCard } from '../../../../car-card/car-card';
import { toSignal } from '@angular/core/rxjs-interop';
import { withLoadState } from '../../../../shared/load-state';

@Component({
  imports: [AsyncPipe, CarCard],
  selector: 'app-car-list',
  styleUrl: './car-list.scss',
  templateUrl: './car-list.html',
})

export class CarList {

  private carService = inject(CarService);

  state = toSignal(withLoadState(this.carService.getCars()), { requireSync: true });
}


