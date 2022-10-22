import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { product } from 'src/app/Model/product/product';
import { HttpClient } from '@angular/common/http';
import { review } from 'src/app/Model/review/review';

let api = environment.apiUrl;
@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  constructor(private http: HttpClient) {}

  getAllReviewByProductID(id: number): Observable<review[]> {
    return this.http.get<review[]>(`${api}/review/product/${id}`);
  }

  postReview(review: review): Observable<review> {
    return this.http.post<review>(`${api}/review`, review, {
      withCredentials: true,
    });
  }
}
