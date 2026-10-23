import { Component } from '@angular/core';
import { input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-car-details',
  styleUrl: './car-details.scss',
  templateUrl: './car-details.html',
})
export class CarDetails {
  readonly id = input.required<string>();
}
