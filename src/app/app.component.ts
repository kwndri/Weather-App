import { Component, DestroyRef, inject, signal } from '@angular/core';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { WeatherService } from './services/weather';
import { WeatherData } from './models/weather.model';
import { WeatherDataComponent } from './components/weather-data/weather-data.component';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [SearchBarComponent, WeatherDataComponent],
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

  onSubmit(city: string) {
    this.city.set(city);
    const subscription = this.weatherService
      .fetchWeatherData(city, 'City not found')
      .subscribe({
        next: (resData) => {
          this.weatherData.set(resData);
          console.log('Weather', this.weatherData()?.name);
          this.error.set('');
        },
        error: (error: Error) => {
          //will be trigerred if any error is produced in the http response
          console.log(error.message);
          this.error.set(error.message);
          this.weatherData.set(null);
        },
      });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
