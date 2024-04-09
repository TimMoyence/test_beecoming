import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
@Component({
  selector: 'app-maps',
  standalone: true,
  imports: [],
  templateUrl: './maps.component.html',
  styleUrl: './maps.component.css',
})
export class MapsComponent implements OnInit {
  ngOnInit() {
    const map = L.map('map').setView([51.505, -0.09], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(map);
  }
}
