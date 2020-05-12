import { Component, OnInit } from '@angular/core'; 
import { Router } from '@angular/router';
import { PokemonsService } from './pokemons.service';

import { Pokemon } from './pokemon'; 

@Component({ 
 selector: 'list-pokemon', 
 templateUrl: './list-pokemon.component.html', 
}) 
export class ListPokemonComponent implements OnInit {

  pokemons: Pokemon[] = null; 

  constructor(
    private router: Router,
    private pokemonsService: PokemonsService ) {}

  ngOnInit(): void { 
      this.getPokemons(); 
     } 
      
      // APRES 
  getPokemons(): void { 
    this.pokemonsService.getPokemons()
         .subscribe(pokemons => this.pokemons = pokemons); 
 }

  selectPokemon(pokemon: Pokemon): void { 
    let link = ['/pokemon', pokemon.id]; 
    this.router.navigate(link);
  } 
}