import { Component, DestroyRef, inject, signal } from '@angular/core';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { WeatherService } from './services/weather';
import { WeatherData, WeatherDataDaily } from './models/weather.model';
import { WeatherDataComponent } from './components/weather-data/weather-data.component';
import { DailyWeatherGridComponent } from './components/daily-weather-grid-component/daily-weather-grid-component';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [
    SearchBarComponent,
    WeatherDataComponent,
    DailyWeatherGridComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  protected title = 'weather-app';
  weatherService = inject(WeatherService);
  private destroyRef = inject(DestroyRef);
  error = signal('');
  weatherData = signal<WeatherData | null>(null);
  city = signal<string>('');
  dailyWeatherData = signal<Record<string, WeatherDataDaily[]> | undefined>(
    undefined
  );

  onSubmit(city: string) {
    this.city.set(city);
    const subscription = this.weatherService
      .fetchCurrentWeatherData(city, 'City not found')
      .subscribe({
        next: (resData) => {
          this.weatherData.set(resData);
          console.log('Weather', this.weatherData()?.name);
          this.fetchWeatherDailyData(city, 'City not found');
        },
        error: (error: Error) => {
          console.log(error.message);
          this.error.set(error.message);
          this.weatherData.set(null);
        },
      });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  groupDates(dailyWeatherData: WeatherDataDaily[]) {
    const groups: Record<string, WeatherDataDaily[]> = {};

    for (const item of dailyWeatherData) {
      const date = item.dt_txt.split(' ')[0];

      if (!groups[date]) {
        groups[date] = [];
      }

      groups[date].push(item);
    }

    console.log(groups);
    return groups;
  }

  fetchWeatherDailyData(city: string, error: string) {
    const subscription = this.weatherService
      .fetchDailyWeatherData(city, error)
      .subscribe({
        next: (resData) => {
          this.dailyWeatherData.set(this.groupDates(resData));
          console.log('Weather', this.weatherData()?.name);
          this.error.set('');
        },
        error: (error: Error) => {
          console.log(error.message);
          this.error.set(error.message);
          this.dailyWeatherData.set(undefined);
        },
      });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
