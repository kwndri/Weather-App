import { Component, input } from '@angular/core';
import { WeatherDataDaily } from '../../models/weather.model';
import { CommonModule } from '@angular/common';
import { DailyWeatherDataComponent } from '../daily-weather-data-component/daily-weather-data-component';

@Component({
  selector: 'app-daily-weather-grid-component',
  imports: [CommonModule, DailyWeatherDataComponent],
  templateUrl: './daily-weather-grid-component.html',
  styleUrl: './daily-weather-grid-component.css',
})
export class DailyWeatherGridComponent {
  dailyWeatherData = input<Record<string, WeatherDataDaily[]> | undefined>();
}
