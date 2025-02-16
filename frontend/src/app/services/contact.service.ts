import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
    private apiUrl = `${environment.apiUrl}/`; 

    constructor(private http: HttpClient) {}

    getContacts(): Observable<Contact[]> {
        return this.http.get<Contact[]>(`${this.apiUrl}/contacts`);
    }

    getContactById(id: string): Observable<Contact> {
        return this.http.get<Contact>(`${this.apiUrl}/contacts/${id}`);
    }

    createContact(contact: Contact): Observable<Contact> {
        return this.http.post<Contact>(`${this.apiUrl}/contacts`, contact);
    }

    updateContact(id: string, contact: Contact): Observable<Contact> {
        return this.http.put<Contact>(`${this.apiUrl}/contacts/${id}`, contact);
    }

    deleteContact(id: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/contacts/${id}`);
    }
}
