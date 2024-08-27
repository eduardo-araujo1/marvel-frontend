import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginDTO, LoginResponseDTO, RegisterDTO } from '../model/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/auth';

  constructor(private http: HttpClient) { }

  login(loginDTO: LoginDTO): Observable<LoginResponseDTO> {
    return this.http.post<LoginResponseDTO>(`${this.apiUrl}/login`, loginDTO);
  }

  register(registerDTO: RegisterDTO): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/register`, registerDTO);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }
}