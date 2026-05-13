import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'moves',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'recipes',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'privacy',
    renderMode: RenderMode.Prerender
  },
  {
    path: '404',
    renderMode: RenderMode.Prerender
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
