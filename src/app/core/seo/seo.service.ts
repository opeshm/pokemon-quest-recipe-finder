import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

const SITE_ORIGIN = 'https://pokequest.opeshm.net';
const SITE_NAME = 'PokeQuest Studio';
const DEFAULT_IMAGE = `${SITE_ORIGIN}/assets/social-preview.svg`;

export interface SeoRouteData {
  title: string;
  description: string;
  path: string;
}

const DEFAULT_SEO: SeoRouteData = {
  title: 'Pokemon Quest Recipe Finder, Pokedex, and Moves | PokeQuest Studio',
  description:
    'Search Pokemon Quest recipes, browse every Pokemon, and compare moves with a fast fan-made PokeQuest reference app.',
  path: '/'
};

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly document = inject(DOCUMENT);
  private readonly meta = inject(Meta);
  private readonly router = inject(Router);
  private readonly title = inject(Title);

  init(): void {
    this.applyCurrentRoute();

    this.router.events.pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd)).subscribe(() => {
      this.applyCurrentRoute();
    });
  }

  private applyCurrentRoute(): void {
    const seo = this.findSeoData(this.router.routerState.snapshot.root) ?? DEFAULT_SEO;
    const canonicalUrl = `${SITE_ORIGIN}${seo.path}`;

    this.title.setTitle(seo.title);
    this.upsertCanonical(canonicalUrl);
    this.meta.updateTag({ name: 'description', content: seo.description });
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({ property: 'og:site_name', content: SITE_NAME });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:title', content: seo.title });
    this.meta.updateTag({ property: 'og:description', content: seo.description });
    this.meta.updateTag({ property: 'og:url', content: canonicalUrl });
    this.meta.updateTag({ property: 'og:image', content: DEFAULT_IMAGE });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: seo.title });
    this.meta.updateTag({ name: 'twitter:description', content: seo.description });
    this.meta.updateTag({ name: 'twitter:image', content: DEFAULT_IMAGE });
  }

  private findSeoData(route: ActivatedRouteSnapshot): SeoRouteData | null {
    let current: ActivatedRouteSnapshot | null = route;
    let seo: SeoRouteData | null = null;

    while (current) {
      seo = (current.data['seo'] as SeoRouteData | undefined) ?? seo;
      current = current.firstChild;
    }

    return seo;
  }

  private upsertCanonical(href: string): void {
    let canonical = this.document.querySelector<HTMLLinkElement>('link[rel="canonical"]');

    if (!canonical) {
      canonical = this.document.createElement('link');
      canonical.rel = 'canonical';
      this.document.head.appendChild(canonical);
    }

    canonical.href = href;
  }
}
