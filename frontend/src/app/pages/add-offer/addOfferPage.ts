import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import {  FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink} from '@angular/router';
import { finalize } from 'rxjs';

import { Business } from '../../models/business.model';
import { BusinessService } from '../../services/business.service';
import { OfferService } from '../../services/offer.service';


@Component({
  selector: 'app-add-offer-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './addOfferPage.html',
  styleUrl: './addOfferPage.css'
})
export class AddOfferPage implements OnInit {
  private readonly formBuilder = inject(FormBuilder).nonNullable;
  private readonly offerService = inject(OfferService);
  private readonly businessService = inject(BusinessService);
  private readonly router = inject(Router);
  private readonly changeDetector = inject(ChangeDetectorRef);

  businesses: Business[] = [];
  isLoadingBusinesses = true;
  isSubmitting = false;
  errorMessage = '';

  offerForm = this.formBuilder.group({
    title: [
      '',
      [
        Validators.required,
        Validators.maxLength(100)
      ]
    ],
    description: [
      '',
      [
        Validators.required,
        Validators.maxLength(500)
      ]
    ],
    amountOfUses: [
      1,
      [
        Validators.min(1)
      ]
    ],
    business: [
      '',
      Validators.required
    ],
    category: [
      [] as string[],
      Validators.required
    ],
    discount: [
      0,
      [
        Validators.required,
        Validators.min(0),
        Validators.max(100)
      ]
    ],
    plan: [
      [] as string[],
      Validators.required
    ],
    redeemableDays: [
      [] as string[]
    ],
    locations: [
      [] as string[],
      Validators.required
    ],
    offerImages: [
      [] as string[]
    ],
    expiryDate: [
      Validators.required
    ],
    status: [
      'active' as 'active' | 'inactive',
    ],
    termsAndConditions: [
      '',
      Validators.required
    ]
  });

  toggleArrayValue(
    controlName: 'plan' | 'redeemableDays',
    value: string,
    event: Event
  ): void {
    const checkbox = event.target as HTMLInputElement;
    const control = this.offerForm.controls[controlName];
    const currentValues = control.value;

    if (checkbox.checked) {
      control.setValue([...currentValues, value]);
    } else {
      control.setValue(
        currentValues.filter((item) => item !== value)
      );
    }

    control.markAsTouched();
    control.updateValueAndValidity();

    this.changeDetector.markForCheck();
  }

  ngOnInit(): void {
    this.loadBusinesses();
  }

  loadBusinesses(): void {
    this.isLoadingBusinesses = true;
    this.errorMessage = '';

    this.changeDetector.markForCheck();

    this.businessService
      .getBusinesses()
      .pipe(
        finalize(() => {
          this.isLoadingBusinesses = false;
          this.changeDetector.markForCheck();
        })
      )
      .subscribe({
        next: (response) => {
            this.businesses = response.data ?? [];

            this.changeDetector.markForCheck();
        },

      error: (error) => {
        console.error('Failed to load businesses:', error);

        this.businesses = [];
        this.errorMessage = 'Unable to load businesses.';
        
        this.changeDetector.markForCheck();
      }
    });
  }

  submitOffer(): void {
    if (this.offerForm.invalid) {
      this.offerForm.markAllAsTouched();
      this.changeDetector.markForCheck();
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    this.changeDetector.markForCheck();

    this.offerService
      .createOffer(this.offerForm.getRawValue())
      .pipe(
        finalize(() => {
          this.isSubmitting = false;
          this.changeDetector.markForCheck();
        })
      )
      .subscribe({
        next: () => {
          this.router.navigate(['/offers']);
        },

      error: (error) => {
        console.error('Failed to create offer:', error);

        this.errorMessage = 'Unable to create the offer.';
        this.changeDetector.markForCheck();
    }
    });
  }
}