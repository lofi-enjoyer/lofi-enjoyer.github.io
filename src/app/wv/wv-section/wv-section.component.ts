import {Component, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
import {RouterLink, RouterOutlet} from '@angular/router';
import {Meta} from '@angular/platform-browser';

@Component({
  selector: 'app-wv-section',
  imports: [
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './wv-section.component.html',
  styleUrl: './wv-section.component.css'
})
export class WvSectionComponent implements OnInit {

  constructor(
    private meta: Meta
  ) {
  }

  ngOnInit() {
    this.meta.updateTag({ property: 'og:title', content: 'WorldVisión' });
    this.meta.updateTag({ property: 'og:description', content: 'Consulta aquí las participaciones de todas las ediciones de WorldVisión.' });
    this.meta.updateTag({ property: 'og:url', content: 'https://lofi-enjoyer.github.io/wv' });
    this.meta.updateTag({ property: 'og:image', content: 'https://lofi-enjoyer.github.io/wv2026-full.png' });
  }

}
