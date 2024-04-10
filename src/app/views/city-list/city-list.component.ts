import { NgFor } from '@angular/common';
import { Component, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { CapitalsGetaway } from '../../core/adapters/capitals.getaway';
@Component({
  selector: 'app-city-list',
  standalone: true,
  imports: [NgFor, RouterLink],
  templateUrl: './city-list.component.html',
  styleUrl: './city-list.component.css',
})
export default class CityListComponent {
  capitals: Signal<any[]> = toSignal(this.capitalsGetaway.getCapitals(), {
    initialValue: [],
  });

  constructor(private capitalsGetaway: CapitalsGetaway) {}

  deleteCapitalInJson(capital: any) {
    this.capitalsGetaway.deleteCapital(capital).subscribe();
  }
}
