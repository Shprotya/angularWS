import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CarService } from '../../services/car.service';
import { CarModel } from '../../models/car.model';
import { AsyncPipe } from '@angular/common';

@Component({
  imports: [AsyncPipe],
  selector: 'app-car-list',
  styleUrl: './car-list.scss',
  templateUrl: './car-list.html',
})

export class CarList implements OnInit {

private carService = inject(CarService);
  
  cars$!: Observable<CarModel[]>;

  ngOnInit(): void {
    this.cars$ = this.carService.getCars();
  }
}

