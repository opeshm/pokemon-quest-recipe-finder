import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AppLanguage, LanguageService } from './core/i18n/language.service';
import { TranslatePipe } from './core/i18n/translate.pipe';
import { PokemonProfileModalComponent } from './shared/pokemon-profile/pokemon-profile-modal.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, PokemonProfileModalComponent, TranslatePipe],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {
  private readonly languageService = inject(LanguageService);

  readonly language = this.languageService.language;
  readonly languageOptions = this.languageService.options;

  setLanguage(value: string): void {
    this.languageService.setLanguage(value === 'es' ? 'es' : 'en');
  }

  trackByLanguage(_: number, option: { value: AppLanguage }): AppLanguage {
    return option.value;
  }
}
