import { Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CarModel } from '../models/car.model';

@Service()
export class CarService {
    private http = inject(HttpClient);

    private apiUrl = 'http://localhost:5000/api/v1/cars'; // this should be read from an env variable we will leave it for now.

    getCars(): Observable<CarModel[]> {
        return this.http.get<CarModel[]>(this.apiUrl)
    }

}


