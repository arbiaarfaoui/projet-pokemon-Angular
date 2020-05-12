import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Injectable } from '@angular/core'; 
import { POKEMONS } from './pokemons/mock-pokemons'; 
 
@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService { 
 createDb() {
  let pokemons = POKEMONS;
  return { pokemons }; 
 } 
}