import {AfterViewInit, Component, ElementRef, inject, OnInit, ViewChild} from '@angular/core';
import {EditionService} from '../../../services/edition.service';
import {NgClass, NgForOf, NgIf, NgStyle} from '@angular/common';
import {Song} from '../../../types/song';
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-wv-edition',
  imports: [
    NgForOf,
    NgStyle,
    NgClass,
    NgIf,
    FormsModule
  ],
  templateUrl: './wv-edition.component.html',
  styleUrl: './wv-edition.component.css'
})
export class WvEditionComponent implements OnInit, AfterViewInit {

  @ViewChild('searchBar', { static: false }) searchBar: ElementRef | undefined;

  songs: Song[] | null = null;
  filteredSongs: Song[] = [];
  spoilers: boolean = false;
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
  }

  ngAfterViewInit() {
    const year = this.activatedRoute.snapshot.params['year'];
    this.editionService.fetchEditionData(year).subscribe({
      next: value => {
        this.songs = value;
        this.filterSongs();
      },
      error: err => {
        this.router.navigate(["/", "wv"]);
      }
    });
  }

  filterSongs() {
    if (this.songs) {
      const searchQuery = (this.searchBar?.nativeElement.value as string).toLowerCase();
      this.filteredSongs = this.songs?.filter(song => song.title.toLowerCase().includes(searchQuery) || song.author.toLowerCase().includes(searchQuery) || song.country.toLowerCase().includes(searchQuery));
    }
  }

  toggleSpoilers() {
    this.spoilers = !this.spoilers;
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

  getResultColor(result: string) {
    if (result.toLowerCase().includes('semifinal')) {
      return '#82e3bb';
    } else if (result.toLowerCase().includes('final')) {
      return '#94f16f';
    } else {
      return '#bed6e4';
    }
  }

}
