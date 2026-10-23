import { Component } from '@angular/core';
import { input } from '@angular/core';
import { CarModel } from '../features/cars/models/car.model';

@Component({
  imports: [],
  selector: 'app-car-card',
  styleUrl: './car-card.scss',
  templateUrl: './car-card.html',
})
export class CarCard {
  car = input.required<CarModel>();
}
