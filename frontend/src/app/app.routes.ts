import { Routes } from '@angular/router';

import { OffersPage } from './pages/offers/offersPage';
import { AddOfferPage } from './pages/add-offer/addOfferPage';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'offers',
        pathMatch: 'full'
    },
    {
        path: 'offers',
        component: OffersPage
    },
    {
        path: 'offers/new',
        component: AddOfferPage
    },
    {
        path: '**',
        redirectTo: 'offers'
    }
];
