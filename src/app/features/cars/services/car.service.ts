import { Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { CarModel } from '../models/car.model';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Service()
export class CarService {
    private http = inject(HttpClient);

    private apiUrl = 'http://localhost:5000/api/v1/cars'; // this should be read from an env variable we will leave it for now.

    getCars(): Observable<CarModel[]> {
        return this.http.get<CarModel[]>(this.apiUrl)
    }

    getCarById(id: string): Observable<CarModel> {
        return this.http.get<CarModel>(`${this.apiUrl}/${id}`);
    }

    addCar(car: CarModel): Observable<CarModel> {
        return this.http.post<CarModel>(this.apiUrl, car)
            .pipe(
                catchError(this.handleError)
            )
    }


    private handleError(error: HttpErrorResponse) {
        if (error.status === 0) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong.

            if (error.status == 401 || error.status == 403) {

                console.error('authorisation issue ', error.status);
                return throwError(() => new Error('You are not authorised for that action'));

            }
            console.error(
                `Backend returned code ${error.status}, body was: `, error.error);
        }
        // Return an observable with a user-facing error message.
        return throwError(() => new Error('Something bad happened; please try again later.'));
    }

}


