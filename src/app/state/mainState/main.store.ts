import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface MainState {
  dummy: string;
}

export const createInitialState = () => ({
  dummy: ''
});

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'main' })
export class MainStore extends Store<MainState> {
  constructor() {
    super(createInitialState());
  }
}