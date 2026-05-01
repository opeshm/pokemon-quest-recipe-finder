import { Injectable, signal } from '@angular/core';

export type AppLanguage = 'en' | 'es';

const LANGUAGE_STORAGE_KEY = 'pokuest-language';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly _language = signal<AppLanguage>(this.readInitialLanguage());

  readonly language = this._language.asReadonly();
  readonly options: Array<{ value: AppLanguage; label: string }> = [
    { value: 'en', label: 'EN' },
    { value: 'es', label: 'ES' }
  ];

  setLanguage(language: AppLanguage): void {
    this._language.set(language);

    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    }
  }

  private readInitialLanguage(): AppLanguage {
    if (typeof localStorage === 'undefined') {
      return 'en';
    }

    return localStorage.getItem(LANGUAGE_STORAGE_KEY) === 'es' ? 'es' : 'en';
  }
}
