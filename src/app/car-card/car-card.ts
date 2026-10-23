import { Component } from '@angular/core';
import { input } from '@angular/core';
import { CarModel } from '../features/cars/models/car.model';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-car-card',
  styleUrl: './car-card.scss',
  templateUrl: './car-card.html',
})
export class CarCard {
  car = input.required<CarModel>();
}
