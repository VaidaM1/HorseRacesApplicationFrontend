import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Horse } from '../entities/horse';

@Injectable({
  providedIn: 'root'
})
export class HorseService {

private http: HttpClient;

constructor(http: HttpClient) {
  this.http = http;
 }
 public getHorses(): Observable<Horse[]> {
  return this.http.get<Horse[]>("https://localhost:44317/Horse");
}

public getHorseById(id: number): Observable<Horse> {
  return this.http.get<Horse>(`https://localhost:44317/Horse/${id}`);
}

public addHorse(horse: Horse): Observable<number>{
  return this.http.post<number>("https://localhost:44317/Horse", horse);
}

public deleteHorse(id: number) : Observable<Horse>{
  return this.http.delete<Horse>(`https://localhost:44317/Horse/${id}`);
}

public updateHorse(horse: Horse) : Observable<Horse>{
  return this.http.put<Horse>("https://localhost:44317/Horse", horse);
} 
}