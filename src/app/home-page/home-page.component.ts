import { Component, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  constructor(private elementRef: ElementRef) {} /* Para obtener una referencia a los elementos de las secciones */

  @HostListener('window:scroll', ['$event']) /* Para detectar los eventos de desplazamiento de la ventana */
  checkScroll() {
    const sections = this.elementRef.nativeElement.querySelectorAll('.seccionDos');

    sections.forEach((section: HTMLElement) => {
      /* Iteramos sobre todas las secciones y comprobamos si la sección está en la mitad de la ventana verticalmente utilizando getBoundingClientRect() */
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      /* Agregamos la clase */
      if (rect.top < windowHeight / 1.5 && rect.bottom > windowHeight / 1.5) {
        section.classList.add('animate__animated');
        section.classList.add('animate__fadeInRightBig');
      }
    });
  }

}
