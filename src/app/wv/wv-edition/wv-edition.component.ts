import {Component, inject, OnInit} from '@angular/core';
import {EditionService} from '../../../services/edition.service';
import {NgClass, NgForOf, NgStyle} from '@angular/common';
import {Song} from '../../../types/song';
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-wv-edition',
  imports: [
    NgForOf,
    NgStyle,
    NgClass
  ],
  templateUrl: './wv-edition.component.html',
  styleUrl: './wv-edition.component.css'
})
export class WvEditionComponent implements OnInit {

  songs: Song[] | null = null;
  private activatedRoute = inject(ActivatedRoute);

  constructor(
    private editionService: EditionService,
    private titleService: Title,
    private router: Router
  ) {
  }

  ngOnInit() {
    const year = this.activatedRoute.snapshot.params['year'];
    this.titleService.setTitle(`WorldVisión ${year}`);
    this.editionService.fetchEditionData(year).subscribe({
      next: value => {
        this.songs = value;
      },
      error: err => {
        this.router.navigate(["/", "wv"]);
      }
    })
  }

  generateGradient(colors: string[]) {
    const step = (1 / colors.length) * 100;
    let gradientString = "";
    gradientString += `${colors[0]} 0%`;
    for (let i = 1; i < colors.length; i++) {
      gradientString += `, ${colors[i - 1]} ${step * i}%, ${colors[i]} ${step * i}%`;
    }
    gradientString += `, ${colors[colors.length - 1]} 100%`;
    return gradientString;
  }

}
