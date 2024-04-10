import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CapitalsGetaway } from '../../core/adapters/capitals.getaway';
import { FormCity } from '../../core/models/formCity.models';
import { cities } from '../../core/models/cities.models';

@Component({
  selector: 'app-form-create',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './form-create.component.html',
  styleUrl: './form-create.component.css',
})
export default class FormCreateComponent {
  formCity: FormCity = new FormCity();
  cities: cities;

  private route = inject(Router);
  private capitalsGetaway = inject(CapitalsGetaway);

  onSubmit(form: NgForm) {
    this.createCityToUpdate(this.formCity);
    this.capitalsGetaway
      .addCapital(this.cities)
      .subscribe((el) => this.route.navigate(['/cities']));
  }

  createCityToUpdate(formCity: FormCity) {
    this.cities = {
      id: formCity.id,
      name: formCity.name,
      country: formCity.country,
      latitude: formCity.latitude,
      longitude: formCity.longitude,
      population: formCity.population,
      language: formCity.language,
      currency: formCity.monnaie + ' (' + formCity.cygle + ')',
      image: formCity.image,
    };
    return this.cities;
  }
}
