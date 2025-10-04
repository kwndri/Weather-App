import { Component, output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-search-bar',
  imports: [FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css',
})
export class SearchBarComponent {
  citySelected = output<string>();

  onSubmit(form: NgForm) {
    const city = form.value.city.trim();
    if (form.valid) {
      console.log('City submitted:', form.value.city);
      if (city) {
        this.citySelected.emit(city);
      }
      form.resetForm();
    }
  }
}
