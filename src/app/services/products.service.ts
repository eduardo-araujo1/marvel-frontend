import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HQ } from '../model/hq';
import { ApiResponse } from '../model/api.response';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  API = "http://localhost:8080/hq";

  constructor(private http : HttpClient) { }

  getAll(page: number, size: number): Observable<ApiResponse<HQ>> {
    return this.http.get<ApiResponse<HQ>>(`${this.API}/list?page=${page}&size=${size}`);
  }

  findById(id: number): Observable<HQ> {
    return this.http.get<HQ>(this.API + "/"+ id);
  }

  filterByPrice(minPrice: number, maxPrice: number, page: number, size: number): Observable<ApiResponse<HQ>> {
    let params = new HttpParams()
      .set('minPrice', minPrice.toString())
      .set('maxPrice', maxPrice.toString())
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<ApiResponse<HQ>>(this.API + "/price", { params });
  }

  searchByName(name: string, page: number, size: number): Observable<ApiResponse<HQ>> {
    const params = new HttpParams()
      .set('name', name)
      .set('page', page.toString())
      .set('size', size.toString());
      
    return this.http.get<ApiResponse<HQ>>(this.API, { params });
  }

  filterByCategory(category: string, page: number, size: number): Observable<ApiResponse<HQ>> {
    const params = new HttpParams()
      .set('category', category)
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<ApiResponse<HQ>>(this.API + "/categories", { params });
  }


}
