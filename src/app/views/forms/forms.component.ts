import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CapitalsGetaway } from '../../core/adapters/capitals.getaway';
import { cities } from '../../core/models/cities.models';
import { FormCity } from '../../core/models/formCity.models';
@Component({
  selector: 'app-forms',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.css',
})
export default class FormsComponent {
  private activRoute = inject(ActivatedRoute);
  private route = inject(Router);
  private capitalsGetaway = inject(CapitalsGetaway);
  formCity: FormCity = new FormCity();
  cities: cities;
  ngOnInit(): void {
    this.activRoute.paramMap.subscribe((params) => {
      const cityId = params.get('id');
      if (cityId) {
        this.capitalsGetaway.getOneCapital(+cityId).subscribe((city) => {
          this.formCity = city[0];
          this.formCity.monnaie = city[0].currency.slice(0, -3);
          this.formCity.cygle = city[0].currency
            .slice(-3)
            .replace(/\(|\)/g, '');
        });
      }
    });
  }

  onSubmit(form: NgForm) {
    this.createCityToUpdate(this.formCity);
    this.capitalsGetaway
      .updateCapital(this.cities)
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
