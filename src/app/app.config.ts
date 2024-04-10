import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpRequest,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom, inject } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { routes } from './app.routes';
import { ErrorHandlingService } from './core/adapters/errors/error-handling.service';

function HttpErrorInterceptor(
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> {
  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      inject(ErrorHandlingService).handleError(error);
      return throwError(() => error);
    })
  );
}

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(BrowserModule),
    provideRouter(routes),
    provideHttpClient(withInterceptors([HttpErrorInterceptor])),
  ],
};
