import { Injectable } from '@angular/core';
import { SharedService } from './shared.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  subscription: any;

  constructor(private shared: SharedService) { }

  populateForm<T>(dataType: string): Observable<T> {
    const storedData = localStorage.getItem(dataType);

    if (storedData) {
      return new Observable<T>((observer) => {
        observer.next(JSON.parse(storedData) as T);
        observer.complete();
      });
    } else {
      if (this.subscription) {
        this.subscription.unsubscribe();
      }
      return new Observable<T>((observer) => {
        this.subscription = this.shared.getSelectedData<T>(dataType).subscribe(response => {
          if (response) {
            localStorage.setItem(dataType, JSON.stringify(response));
            observer.next(response);
          }
          observer.complete();
        });
      });
    }
  }
}
