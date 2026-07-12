import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Offer } from "../models/offer.model";

interface ApiResponse<T> {
    success: boolean;
    message?: string;
    data: T;
}

@Injectable({
    providedIn: "root",
})
export class OfferService {
    private readonly http = inject(HttpClient);
    private readonly apiUrl = "http://localhost:5000/api/offers";

    getOffers(): Observable<ApiResponse<Offer[]>> {
        return this.http.get<ApiResponse<Offer[]>>(this.apiUrl);
    }

    createOffer(offer: Partial<Offer>): Observable<ApiResponse<Offer>> {
        return this.http.post<ApiResponse<Offer>>(this.apiUrl, offer);
    }

    toggleOfferStatus(id: string): Observable<ApiResponse<Offer>> {
        return this.http.patch<ApiResponse<Offer>>(
            `${this.apiUrl}/${id}/status`,
            {}
        );
    }
}