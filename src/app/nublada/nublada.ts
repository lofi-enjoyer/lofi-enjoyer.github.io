import {Component, OnInit, signal} from '@angular/core';
import {ActivatedRoute, Router, RouterOutlet} from '@angular/router';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-nublada',
  imports: [
    RouterOutlet
  ],
  templateUrl: './nublada.html',
  styleUrl: './nublada.css',
})
export class Nublada implements OnInit {

  protected readonly quote = signal('');

  quotes = [
    'Volveré a estudiar; de Nublada no se puede vivir',
    'Busco novia Requisitos: 35446 ⭐ 707 🔴 131 🛠️',
    'Hace milenios, la secta Whitehaven fue creada, este culto rompía muchas leyes de la ética global, por lo que aquellos pertenecientes fueron desterrados a unos frondosos y deshabitados bosques alejados de cualquier otra civilización',
    'Dejen de maltratar a las manzanas',
    'Más churro imposible',
    'Si se llaman orbitales es porque orbitan',
    'si abren el nether juro hacer un beacon de netherite',
    'Nublada murió, hace mínimo, 2 años. Crecí jugando con Udeilu, pan6565, Crazy, Pandiika, Alkimides, Maxi, DavidMGamer, Cap_8, entre tantos otros.. me apena tanto cuando escucho hablar a los jóvenes de "Balconix" o "Enanito99"'
  ]

  staff = [
    { name: 'aur', role: 'Administración', picture: 'avatar1', quote: '(añadir cita de aur)' },
    { name: 'GeniorShost', role: 'Administración', picture: 'avatar2', quote: '(añadir cita de ghost)' },
    { name: 'Di oscuro', role: 'Administración', picture: 'avatar3', quote: '(añadir cita de oscuro)' },
    { name: 'Churro', role: 'Ayudante', picture: 'avatar4', quote: '(añadir cita de churro)' },
    { name: 'Crazy', role: 'Moderación', picture: 'avatar5', quote: '(añadir cita de crazy)' },
    { name: 'Shino', role: 'Ayudante', picture: 'avatar6', quote: '(añadir cita de shino)' },
    { name: 'Vampuz', role: 'Ayudante', picture: 'avatar7', quote: '(añadir cita de vampuz)' }
  ]

  constructor(
    private titleService: Title
  ) {
    this.shuffle(this.staff);
  }

  ngOnInit() {
    this.titleService.setTitle('NubladaMC');

    const quoteIndex = Math.floor(Math.random() * this.quotes.length);
    this.quote.set(this.quotes[quoteIndex]);
  }

  shuffle(array: any) {
    let currentIndex = array.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  }

}
