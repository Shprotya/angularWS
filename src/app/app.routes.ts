import { Routes } from '@angular/router';
import { CarList } from './features/cars/pages/car-list/car-list';
import { CarDetails } from './car-details/car-details';
import { CarForm } from './car-form/car-form';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'cars',
        pathMatch: 'full'
    },
    {
        path: 'cars',
        component: CarList
    },
    {
        path: 'cars/new',
        component: CarForm
    },
    {
        path: 'cars/:id',
        component: CarDetails
    },
];

