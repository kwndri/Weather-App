import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import {
  WeatherDailyResponse,
  WeatherData,
  WeatherDataDaily,
} from '../models/weather.model';
import { catchError, map, tap, throwError } from 'rxjs';
import { environment } from '../../enviroment';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private http = inject(HttpClient);
  private apikey = environment.weatherApiKey;
  private baseUrl = 'https://api.openweathermap.org/data/2.5/';

  fetchCurrentWeatherData(city: string, errorMessage: string) {
    const url = `${this.baseUrl}weather?q=${encodeURIComponent(city)}&appid=${
      this.apikey
    }&units=metric`;

    return this.http.get<WeatherData>(url).pipe(
      catchError((error) => {
        console.error(error);
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  fetchDailyWeatherData(city: string, errorMessage: string) {
    const url = `${this.baseUrl}forecast?q=${encodeURIComponent(city)}&appid=${
      this.apikey
    }&units=metric`;

    return this.http.get<WeatherDailyResponse>(url).pipe(
      map((res) => res.list),
      catchError((error) => {
        console.error(error);
        return throwError(() => new Error(errorMessage));
      })
    );
  }
}
