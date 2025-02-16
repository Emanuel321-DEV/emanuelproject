import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../environments/environment';


export interface JwtPayload {
  sub: string;
  email: string;
  role: string;
  exp: number;
  iat: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private apiUrl = `${environment.apiUrl}/auth/login`; 

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<{ access_token: string }>(this.apiUrl, { email, password }).pipe(
      tap(response => {
        localStorage.setItem('token', response.access_token);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
  
  isAdmin(): boolean {
    const token = localStorage.getItem('token');
    if (!token) return false;
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      return decoded.role === 'admin';
    } catch (err) {
      console.error('Erro ao decodificar o token', err);
      return false;
    }
  }
}
