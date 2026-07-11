import { Routes } from '@angular/router';
import { OffersPage } from './pages/offers/offersPage';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'offers',
        pathMatch: 'full'
    },
    {
        path: 'offers',
        component: OffersPage
    }
];
