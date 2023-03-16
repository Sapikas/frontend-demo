import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class EnvService {
  private _baseUrl!: string;
  private _baseApiUrl!: string;

  constructor(
    private platform: Platform,
  ) { }

  get baseUrl(): string {
    return this._baseUrl;
  }

  get baseApiUrl(): string {
    return this._baseApiUrl;
  }

  private setEnvVariables(): void {
    const hostname = window && window.location && window.location.hostname;

    if (/^localhost/.test(hostname)) {
      this._baseUrl = 'http://localhost:4000';
    } else {
      console.warn(`Cannot find environment for host name ${hostname}`);
    }

    this._baseApiUrl = this._baseUrl + '/api/v1';
  }
}