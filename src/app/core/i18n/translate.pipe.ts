import { Pipe, PipeTransform, inject } from '@angular/core';
import { LanguageService } from './language.service';
import { TRANSLATIONS, TranslationKey } from './translations';

@Pipe({
  name: 'translate',
  standalone: true,
  pure: false
})
export class TranslatePipe implements PipeTransform {
  private readonly languageService = inject(LanguageService);

  transform(key: TranslationKey): string {
    const language = this.languageService.language();

    return TRANSLATIONS[language][key] ?? TRANSLATIONS.en[key] ?? key;
  }
}
