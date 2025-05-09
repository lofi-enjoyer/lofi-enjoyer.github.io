import {AfterViewInit, Component, ElementRef, OnInit, viewChild, ViewChild} from '@angular/core';
import {NgForOf, NgStyle} from '@angular/common';
import {Country} from '../../../types/country';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-creator',
  imports: [
    NgForOf,
    NgStyle
  ],
  templateUrl: './creator.component.html',
  styleUrl: './creator.component.css'
})
export class CreatorComponent implements OnInit {

  countries : Country[] | null = null;
  countriesMap : Map<string, Country> = new Map<string, Country>();
  uploadElement = viewChild<ElementRef<HTMLInputElement>>("upload");

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.http.get<Country[]>("/countries.json").subscribe({
      next: value => {
        this.countries = value;
        setTimeout(() => {
          if (window.localStorage.getItem("data")) {
            // @ts-ignore
            JSON.parse(window.localStorage.getItem("data")).forEach(element => {
              // @ts-ignore
              document.querySelector(`#${element.country.replaceAll(" ", "-")}-title`).value = element.title;
              // @ts-ignore
              document.querySelector(`#${element.country.replaceAll(" ", "-")}-artist`).value = element.author;
              // @ts-ignore
              document.querySelector(`#${element.country.replaceAll(" ", "-")}-youtube`).value = element.links.youtube;
              // @ts-ignore
              document.querySelector(`#${element.country.replaceAll(" ", "-")}-spotify`).value = element.links.spotify;
            });
          }
        }, 50);
      },
      error: err => {
        console.log(err);
      }
    });
  }

  generateGradient(colors: string[]) {
    const step = (1 / colors.length) * 100;
    let gradientString = "45deg, ";
    gradientString += `${colors[0]} 0%`;
    for (let i = 1; i < colors.length; i++) {
      gradientString += `, ${colors[i - 1]} ${step * i}%, ${colors[i]} ${step * i}%`;
    }
    gradientString += `, ${colors[colors.length - 1]} 100%`;
    return gradientString;
  }

  getData() {
    const fileData: any = [];
    [...document.querySelectorAll(".country")].forEach(countryElement => {
      // @ts-ignore
      const countryNameWithFlag = countryElement.querySelector("h2").textContent;
      // @ts-ignore
      const countryName = countryNameWithFlag.substring(countryNameWithFlag.indexOf(" ") + 1);
      const countryId = countryName.replaceAll(" ", "-");

      // @ts-ignore
      const songName = countryElement.querySelector(`#${countryId}-title`)?.value;
      // @ts-ignore
      const songArtist = countryElement.querySelector(`#${countryId}-artist`).value;
      // @ts-ignore
      const songYoutube = countryElement.querySelector(`#${countryId}-youtube`).value;
      // @ts-ignore
      const songSpotify = countryElement.querySelector(`#${countryId}-spotify`).value;

      if (!songName) {
        return;
      }

      fileData.push({
        "country": countryName,
        "flag": this.countriesMap.get(countryName)?.flag,
        "title": songName,
        "author": songArtist,
        "links": {
          "youtube": songYoutube,
          "spotify": songSpotify
        },
        "colors": this.countriesMap.get(countryName)?.colors
      });
    });

    return fileData;
  }

  loadFile() {
    this.uploadElement()?.nativeElement.click();
  }

  save() {
    window.localStorage.setItem("data", JSON.stringify(this.getData()));
  }

  onInputChange() {
    const files = this.uploadElement()?.nativeElement.files;
    const reader = new FileReader();
    reader.onload = () => {
      [...document.querySelectorAll(".country input")].forEach(element => {
        // @ts-ignore
        element.value = "";
      });
      // @ts-ignore
      const jsonResult = JSON.parse(reader.result);
      // @ts-ignore
      jsonResult.forEach(element => {
        // @ts-ignore
        document.querySelector(`#${element.country.replaceAll(" ", "-")}-title`).value = element.title;
        // @ts-ignore
        document.querySelector(`#${element.country.replaceAll(" ", "-")}-artist`).value = element.author;
        // @ts-ignore
        document.querySelector(`#${element.country.replaceAll(" ", "-")}-youtube`).value = element.links.youtube;
        // @ts-ignore
        document.querySelector(`#${element.country.replaceAll(" ", "-")}-spotify`).value = element.links.spotify;
      });

      window.localStorage.setItem("data", JSON.stringify(jsonResult));
    };
    // @ts-ignore
    if (files[0]) {
      // @ts-ignore
      reader.readAsText(files[0]);
    }
  }

}
