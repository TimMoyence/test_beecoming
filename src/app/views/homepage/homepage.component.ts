import { Component } from '@angular/core';
import { MapsComponent } from '../maps/maps.component';
@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [MapsComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
})
export default class HomepageComponent {}
