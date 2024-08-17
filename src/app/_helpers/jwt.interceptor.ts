import { inject } from '@angular/core';
import { HttpRequest, HttpHandlerFn } from '@angular/common/http';

// import { environment } from '@environments/environment';
import { environment } from '@app/environments/environment';
import { AccountService } from '@app/_services';

// @Injectable()
// export class JwtInterceptor implements HttpInterceptor {
//     constructor(private accountService: AccountService) { }

//     intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//         // add auth header with jwt if user is logged in and request is to the api url
//         const user = this.accountService.userValue;
//         const isLoggedIn = user?.token;
//         const isApiUrl = request.url.startsWith(environment.apiUrl);
//         if (isLoggedIn && isApiUrl) {
//             request = request.clone({
//                 setHeaders: { Authorization: `Bearer ${user.token}` }
//             });
//         }

//         return next.handle(request);
//     }
// }

export function jwtInterceptor(request: HttpRequest<any>, next: HttpHandlerFn) {
  // add auth header with jwt if user is logged in and request is to the api url
  const accountService = inject(AccountService);
  const user = accountService.userValue;
  const isLoggedIn = user?.access_token;
  const isApiUrl = request.url.startsWith(environment.apiUrl);
  if (isLoggedIn && isApiUrl) {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${user?.access_token}`,
        'Content-Type': 'application/json',
      },
    });
  }

  return next(request);
}
