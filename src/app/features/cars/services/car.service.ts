import { Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { CarModel, CreateCarDto } from '../models/car.model';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Service()
export class CarService {
    private http = inject(HttpClient);

    private apiUrl = 'http://localhost:5000/api/v1/cars'; // this should be read from an env variable we will leave it for now.

    getCars(): Observable<CarModel[]> {
        return this.http
            .get<CarModel[]>(this.apiUrl)
            .pipe(catchError((err) => this.handleError(err)));
    }

    getCarById(id: string): Observable<CarModel> {
        return this.http.get<CarModel>(`${this.apiUrl}/${id}`)
            .pipe(catchError((err) => this.handleError(err)));
    }

    addCar(car: CreateCarDto): Observable<CarModel> {
        return this.http.post<CarModel>(this.apiUrl, car)
            .pipe(
                catchError((err) => this.handleError(err))
            )
    }



    private handleError(error: HttpErrorResponse): Observable<never> {
        let message: string;

        switch (error.status) {
            case 0:
                message = 'Cannot reach the server. Check that the API is running.';
                break;
            case 400:
                message = 'Some of the data was not valid.';
                break;
            case 401:
                message = 'Please log in to continue.';
                break;
            case 403:
                message = 'You are not allowed to do that.';
                break;
            case 404:
                message = 'That car could not be found.';
                break;
            default:
                message = 'Something went wrong on the server. Please try again later.';
        }

        // Full details for the developer, a short message for the user
        console.error(`HTTP ${error.status} from ${error.url}`, error);
        return throwError(() => new Error(message));

    }

}
