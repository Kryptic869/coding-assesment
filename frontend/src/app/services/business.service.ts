import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { Business } from "../models/business.model";

interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
}

@Injectable({
    providedIn: "root",
})
export class BusinessService {
    private readonly http = inject(HttpClient);
    private readonly apiUrl = "http://localhost:5000/api/businesses";

    getBusinesses(): Observable<ApiResponse<Business[]>> {
        return this.http.get<ApiResponse<Business[]>>(this.apiUrl);
    }
}