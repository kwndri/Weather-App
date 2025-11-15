import { Component, input } from '@angular/core';
import { WeatherDataDaily } from '../../models/weather.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-daily-weather-data-component',
  imports: [CommonModule],
  templateUrl: './daily-weather-data-component.html',
  styleUrl: './daily-weather-data-component.css',
})
export class DailyWeatherDataComponent {
  dailyWeatherData = input<WeatherDataDaily>();

  get weatherTime() {
    return this.dailyWeatherData()?.dt_txt.split(' ')[1];
  }
}
