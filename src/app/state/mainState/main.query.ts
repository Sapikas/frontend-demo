import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { MainStore, MainState } from './main.store';

@Injectable({ providedIn: 'root' })
export class MainQuery extends Query<MainState> {
  constructor(protected store: MainStore) {
    super(store);
  }
}