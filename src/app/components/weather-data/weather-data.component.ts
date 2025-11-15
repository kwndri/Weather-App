import { Component, computed, input, signal } from '@angular/core';
import { WeatherData } from '../../models/weather.model';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-weather-data',
  imports: [DatePipe, CommonModule],
  templateUrl: './weather-data.component.html',
  styleUrl: './weather-data.component.css',
})
export class WeatherDataComponent {
  city = input<string>('');
  weatherData = input<WeatherData | null>();
  displayCity = computed(() => {
    const newCity =
      this.city()[0].toUpperCase() +
      this.city().substring(1, this.city().length);
    return newCity;
  });
}
