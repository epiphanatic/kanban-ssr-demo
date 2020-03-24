import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(private title: Title, private meta: Meta, private router: Router) { }

  setTitleOnly(title: string) {
    this.title.setTitle(title);
  }

  generateTags({ title = '', description = '', image = '' }) {

    this.title.setTitle(title);
    this.meta.addTags([
      // base tags
      { name: 'description', content: description },

      // Google / Search Engine Tags
      { itemprop: 'title', content: title },
      { itemprop: 'description', content: description },
      { itemprop: 'image', content: image },

      // Facebook Meta Tags
      { property: 'og:url', content: `https://kanban-ssr-demo.firebaseapp.com${this.router.url}` },
      { itemprop: 'og:type', content: 'website' },
      { itemprop: 'og:title', content: title },
      { itemprop: 'og:description', content: description },
      { itemprop: 'og:image', content: image },

      // Open Graph
      { name: 'og:url', content: `https://kanban-ssr-demo.firebaseapp.com${this.router.url}` },
      { name: 'og:title', content: title },
      { name: 'og:description', content: description },
      { name: 'og:image', content: image },

      // Twitter Card
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:site', content: '@Amnion20' },
    ]);
  }
}
