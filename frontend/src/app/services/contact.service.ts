import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';



export interface Contact {
  _id?: string; 
  name: string;
  source: string;
  description: string;
  phone: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {
    private apiUrl = `${environment.apiUrl}`; 

    constructor(private http: HttpClient) {}

    private getHeaders(): HttpHeaders {
        const token = localStorage.getItem('token'); 
        return new HttpHeaders({
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        });
      }

    getContacts(): Observable<Contact[]> {
        return this.http.get<Contact[]>(`${this.apiUrl}/contacts`, { headers: this.getHeaders() });
    }

    getContactById(id: string): Observable<Contact> {
        return this.http.get<Contact>(`${this.apiUrl}/contacts/${id}`, { headers: this.getHeaders() });
    }

    createContact(contact: Contact): Observable<Contact> {
        return this.http.post<Contact>(`${this.apiUrl}/contacts`, contact, { headers: this.getHeaders() });
    }

    updateContact(id: string, contact: Contact): Observable<Contact> {
        return this.http.put<Contact>(`${this.apiUrl}/contacts/${id}`, contact, { headers: this.getHeaders() });
    }

    deleteContact(id: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/contacts/${id}`, { headers: this.getHeaders() });
    }
}
