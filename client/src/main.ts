import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

platformBrowserDynamic()
  .bootstrapModule<AppModule>(AppModule, {
    ngZoneEventCoalescing: true,
  })
  .catch((err: any) => console.error(err));
