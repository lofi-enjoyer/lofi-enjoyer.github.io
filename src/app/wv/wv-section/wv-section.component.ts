import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";
import {RouterLink, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-wv-section',
  imports: [
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './wv-section.component.html',
  styleUrl: './wv-section.component.css'
})
export class WvSectionComponent {

}
