import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import {
  HttpHandlerFn,
  HttpRequest,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';

//create an intercepter
/*function loggingInterceptor(
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
) {
  console.log('[Outgoing Request]');
  console.log(request);
  return next(request);
}*/

/* ✅ What will happen if you uncomment it:
Every time your app makes an HTTP call using HttpClient, this interceptor will:

Log the request to the console

Pass the request along unmodified*/

/*

Nice — modifying headers is one of the most common use cases for HTTP interceptors in Angular.

If you're using this functional interceptor pattern (Angular 15+), you can clone the request and add headers before passing it to next().

✅ Here’s how to add extra headers:

function loggingInterceptor(
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
) {
  console.log('[Outgoing Request]');
  console.log(request);

  const modifiedRequest = request.clone({
    setHeaders: {
      Authorization: 'Bearer YOUR_TOKEN_HERE',
      'X-Custom-Header': 'MyValue'
    }
  });

  return next(modifiedRequest);
}
🔎 Why clone?
Angular's HttpRequest objects are immutable. That means you can't modify them directly — you must use .clone() to create a new instance with changes.

🔁 What this will do:
Log the original request.

Create a new request with extra headers:

Authorization: Bearer YOUR_TOKEN_HERE

X-Custom-Header: MyValue

Pass the modified request down the chain.

💡 Bonus Tip: Conditional headers
You can also conditionally add headers based on URL, method, etc:

const isApiRequest = request.url.includes('/api');
const modifiedRequest = isApiRequest
  ? request.clone({
      setHeaders: {
        'X-API-Key': '123456'
      }
    })
  : request;

  */

bootstrapApplication(AppComponent, {
  providers: [
    //providers setting to register a provider for http client
    provideHttpClient(/* ihave to add here the withInterceptors([])*/),
  ],
}).catch((err) => console.error(err));
