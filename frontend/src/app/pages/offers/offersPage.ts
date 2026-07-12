import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { finalize } from 'rxjs';

import { Offer } from '../../models/offer.model';
import { OfferService } from '../../services/offer.service';
import { OfferCard } from '../../components/offer-card/offerCard';

@Component({
  selector: 'app-offers-page',
  standalone: true,
  imports: [CommonModule, OfferCard],
  templateUrl: './offersPage.html',
  styleUrl: './offersPage.css'
})

export class OffersPage implements OnInit {
  // Inject the OfferService to fetch offers from the backend
  private readonly offerService = inject(OfferService);

  offers: Offer[] = [];
  isLoading = true;
  errorMessage = '';

  // The ngOnInit lifecycle hook is called after the component is initialized
  ngOnInit(): void {
    this.loadOffers();
  }

  // Method to load offers from the backend using the OfferService
  loadOffers(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.offerService
    .getOffers()
    .pipe(
        finalize(() => {
            this.isLoading = false;
        })
    )
    .subscribe({
      next: (response) => {
        this.offers = response.data;
      },
      error: (error) => {
        console.error('Failed to load offers:', error);

        this.errorMessage = 'Unable to load offers. Please try again.';
      }
    });
  }
}