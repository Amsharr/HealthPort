import { HttpClient } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { MessageService } from "primeng/api";
import { of, throwError } from "rxjs";
import { AuthenticationService } from "./authentication.service";
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('AuthenticationService', () => {
  let authService: AuthenticationService;
  let httpClient: HttpClient;
  let messageServiceSpy: jasmine.SpyObj<MessageService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('MessageService', ['add']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthenticationService,
        { provide: MessageService, useValue: spy }
      ]
    });

    authService = TestBed.inject(AuthenticationService);
    httpClient = TestBed.inject(HttpClient);
    messageServiceSpy = TestBed.inject(MessageService) as jasmine.SpyObj<MessageService>;
  });

  it('should handle login and display success message', () => {
    const username = 'testuser';
    const password = 'testpassword';
    const endpoint = 'login';

    spyOn(httpClient, 'post').and.returnValue(of({}));

    authService.login(username, password, endpoint).subscribe(() => {
      expect(messageServiceSpy.add).toHaveBeenCalledWith({ severity: 'success', summary: 'Success', detail: 'Login successful!' });
    });

    expect(httpClient.post).toHaveBeenCalledWith(`${authService.baseApiUrl}/${endpoint}`, { username, password });
  });

  it('should handle login error and display error message', () => {
    const username = 'testuser';
    const password = 'wrongpassword';
    const endpoint = 'login';

    spyOn(httpClient, 'post').and.returnValue(throwError('Unauthorized'));

    authService.login(username, password, endpoint).subscribe({
      error: (err) => {
        expect(messageServiceSpy.add).toHaveBeenCalledWith({ severity: 'error', summary: 'Error', detail: 'Incorrect password or username. Try again' });
      }
    });

    expect(httpClient.post).toHaveBeenCalledWith(`${authService.baseApiUrl}/${endpoint}`, { username, password });
  });
});
