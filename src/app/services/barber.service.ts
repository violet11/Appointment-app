import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Appointment } from '../interfaces/appointment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    // 'Access-Control-Allow-Origin': '*',
    // 'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
    // 'Authorization': 'Bearer szdp79a2kz4wh4frjzuqu4sz6qeth8m3',
    // 'Access-Control-Allow-Credentials' : 'true',
    // 'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
  })
}

@Injectable({
  providedIn: 'root'
})
export class BarberService {
  url = "http://localhost:3000";
  urlGifs = "http://api.giphy.com/v1/gifs/search?api_key=KeTn0RgXZQF8EDkUGgQmSaJYuWPEz5mI&q=barber";
  
  constructor(private http: HttpClient) { }
  
  // get data - barbers
  getBarbers(): Observable<any[]> {
    return this.http.get<any[]>(this.url + "/barbers");
  }
  
  // get data - services
  getServices(): Observable<any> {
    return this.http.get<any[]>(this.url + "/services"); 
  }

  // get data - appointments
  getAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(this.url + "/appointments"); 
  }

  // post data - appointment
  addAppointment(appointment: Appointment): Observable<Appointment> {
    return this.http.post<Appointment>(this.url + "/appointments", appointment, httpOptions);
  }

  // get data - gifs
  getGifs(): Observable<any> {
    return this.http.get<any>(this.urlGifs);
  }
}