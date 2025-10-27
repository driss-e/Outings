
import { Component, ChangeDetectionStrategy, signal, effect, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink]
})
export class HeaderComponent {
  isMenuOpen = signal(false);
  isDarkMode = signal(false);

  #platformId = inject(PLATFORM_ID);

  constructor() {
    if (isPlatformBrowser(this.#platformId)) {
      this.isDarkMode.set(document.documentElement.classList.contains('dark'));
    }

    effect(() => {
      if (isPlatformBrowser(this.#platformId)) {
        if (this.isDarkMode()) {
          document.documentElement.classList.add('dark');
          localStorage.setItem('theme', 'dark');
        } else {
          document.documentElement.classList.remove('dark');
          localStorage.setItem('theme', 'light');
        }
      }
    });
  }

  toggleMenu() {
    this.isMenuOpen.update(v => !v);
  }

  toggleDarkMode() {
    this.isDarkMode.update(v => !v);
  }
}