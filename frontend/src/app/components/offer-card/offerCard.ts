import { ChangeDetectorRef, Component, inject, Input } from '@angular/core';
import { finalize } from 'rxjs';

import { Offer } from '../../models/offer.model';
import { OfferService } from '../../services/offer.service';

@Component({
  selector: 'app-offer-card',
  standalone: true,
  templateUrl: './offerCard.html',
  styleUrl: './offerCard.css'
})
export class OfferCard {
    private readonly offerService = inject(OfferService);
    private readonly changeDetector = inject(ChangeDetectorRef);

  // The offer input property is required and must be provided by the parent component
  @Input({ required: true }) offer!: Offer;

  isUpdating = false;
  updateErrorMessage = '';

  toggleStatus(): void {
    this.isUpdating = true;
    this.updateErrorMessage = '';

    this.offerService
    .toggleOfferStatus(this.offer._id)
    .pipe(
        finalize(() => {
            this.isUpdating = false;
            this.changeDetector.markForCheck();
        })
    )
    .subscribe({
      next: (response) => {
        console.log('PATCH response:', response);

        this.offer = {
            ...this.offer,
            status: response.data.status
        };

        this.changeDetector.markForCheck();
      },
      error: (error) => {
        console.error('Failed to update offer status:', error);

        this.updateErrorMessage = 'Unable to update offer status. Please try again.';
      }
    });
}
}