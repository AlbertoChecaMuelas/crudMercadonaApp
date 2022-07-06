import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CharactersService {
  private endPointCharacters = '/character';

  constructor(private http: HttpClient) {}

  public getAllCharacters(): Observable<any> {
    return this.http.get(environment.apiUrl + this.endPointCharacters);
  }
}
