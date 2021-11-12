import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Better } from '../entities/better';

@Injectable({
  providedIn: 'root'
})
export class BetterService {

  private http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
   }

   public getBetters(): Observable<Better[]> {
    return this.http.get<Better[]>("https://localhost:44317/Better");
  }
  
  public getBetterById(id: number): Observable<Better> {
    return this.http.get<Better>(`https://localhost:44317/Better/${id}`);
  }

  public getBettersByHorse(horseId: number): Observable<Better[]> {
    return this.http.get<Better[]>(`https://localhost:44317/Better/BettersbyHorse/${horseId}`);
  }
  
  public addBetter(better: Better): Observable<number>{
    return this.http.post<number>("https://localhost:44317/Better", better);
  }
  
  public deleteBetter(id: number) : Observable<Better>{
    return this.http.delete<Better>(`https://localhost:44317/Better/${id}`);
  }
  
  public updateBetter(better: Better) : Observable<Better>{
    return this.http.put<Better>("https://localhost:44317/Better", better);
  } 




}
