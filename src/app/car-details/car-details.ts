import { Component } from '@angular/core';
import { input, inject, signal } from '@angular/core';
import { CarService } from '../features/cars/services/car.service';
import { CarModel } from '../features/cars/models/car.model';

@Component({
  imports: [],
  selector: 'app-car-details',
  styleUrl: './car-details.scss',
  templateUrl: './car-details.html',
})
export class CarDetails {
  private carService = inject(CarService);

  readonly id = input.required<string>();

  readonly car = signal<CarModel | null>(null);

  ngOnInit(): void {
    this.carService.getCarById(this.id()).subscribe(car => {
      this.car.set(car);
    });

  }

}
