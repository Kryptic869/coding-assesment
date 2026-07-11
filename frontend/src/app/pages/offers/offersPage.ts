import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';

import { Offer } from '../../models/offer.model';
import { OfferService } from '../../services/offer.service';

@Component({
  selector: 'app-offers-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './offersPage.html',
  styleUrl: './offersPage.css'
})
export class OffersPage implements OnInit {
  private readonly offerService = inject(OfferService);

  offers: Offer[] = [];
  isLoading = true;
  errorMessage = '';

  ngOnInit(): void {
    this.loadOffers();
  }

  loadOffers(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.offerService.getOffers().subscribe({
      next: (response) => {
        this.offers = response.data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Failed to load offers:', error);

        this.errorMessage = 'Unable to load offers. Please try again.';
        this.isLoading = false;
      }
    });
  }
}