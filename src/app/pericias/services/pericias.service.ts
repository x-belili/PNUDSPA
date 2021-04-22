import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Archivo, Pericia } from '../models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PericiasService {

  baseURLPericia = environment.apiURL + 'informe-pericial/file/cod-unico';

  constructor(
    private http: HttpClient
  ) { }

  getDocument(codUnico: string): Observable<Pericia> {
    let header = {
      "Accept": "application/json;charset=UTF-8"
    }
    let query = {
      codUnico: (codUnico) ? codUnico.toString() : ''
    };
    return this.http.get<Pericia>(`${this.baseURLPericia}`, {
      headers: header,
      params: query
    });
  }

  saveDataSession(file: Archivo): boolean {
    if (typeof (Storage) !== 'undefined') {
      sessionStorage.setItem('nameFile', file.nombre);
      sessionStorage.setItem('code64', file.encodeBase64);
      return true;
    } else { return false }
  }

  getDateSession(): Archivo {
    if (sessionStorage.getItem('nameFile') && sessionStorage.getItem('code64')) {
      let arch: Archivo = {
        nombre: sessionStorage.getItem('nameFile'),
        encodeBase64: sessionStorage.getItem('code64')
      }
      return arch
    } else { return null }
  }

  deleteDataSession(): void { sessionStorage.clear(); }
}