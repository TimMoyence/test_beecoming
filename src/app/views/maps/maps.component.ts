import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { LatLngTuple } from 'leaflet';
import { CapitalsGetaway } from '../../core/adapters/capitals.getaway';

@Component({
  selector: 'app-maps',
  standalone: true,
  imports: [],
  templateUrl: './maps.component.html',
  styleUrl: './maps.component.css',
})
export class MapsComponent implements OnInit {
  myIcon = L.icon({
    iconUrl: 'assets/my-icon.png',
    iconSize: [30, 55],
    iconAnchor: [18, 45],
    popupAnchor: [-3, -76],
  });

  myposition = L.icon({
    iconUrl: 'assets/my-position.png',
    iconSize: [30, 55],
    iconAnchor: [18, 45],
    popupAnchor: [-3, -76],
  });

  map: L.Map;

  constructor(private capitalsGetaway: CapitalsGetaway) {}

  ngOnInit() {
    this.map = L.map('map').setView([0, 0], 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(this.map);

    this.capitalsGetaway.getCapitals().subscribe((capitals) => {
      capitals.forEach((capital) => {
        const LatLng = [capital.latitude, capital.longitude];
        const popupContent = `
          <div>
            <h3>${capital.name}</h3>
            <p><strong>Pays:</strong> ${capital.country}</p>
            <p><strong>Population:</strong> ${capital.population}</p>
          </div>
        `;
        L.marker(LatLng as LatLngTuple, { icon: this.myIcon })
          .addTo(this.map)
          .bindPopup(popupContent);
      });
    });
  }

  locateUser() {
    this.map.locate({ setView: true, maxZoom: 2 });

    this.map.on('locationfound', (e) => {
      L.marker(e.latlng, { icon: this.myposition }).addTo(this.map);
    });

    this.map.on('locationerror', (e) => {
      alert(e.message);
    });
  }
}
