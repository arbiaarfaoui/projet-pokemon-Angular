import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { PokemonsService } from './pokemons.service';

import { Pokemon } from './pokemon';
import { POKEMONS } from './mock-pokemons';

@Component({
    selector : 'detail-pokemon',
    templateUrl : './detail-pokemon.component.html'
  })

  export class DetailPokemonComponent implements OnInit { 
   
    pokemon: Pokemon = null; // Le pokémon à afficher dans le template.
      
    // On injecte 'route' pour récupérer les paramètres de l'url,
    // et 'router' pour rediriger l'utilisateur.
    constructor(
       private route: ActivatedRoute,
       private router: Router,
       private pokemonsService: PokemonsService) {} 
     
    ngOnInit(): void { 
      let id = +this.route.snapshot.params['id'];
        this.pokemonsService.getPokemon(id)
           .subscribe(pokemon => this.pokemon = pokemon);  
     }

    
    // Méthode permettant de rediriger l'utilisateur vers la page principale de l'application. 
    goBack(): void { 
     this.router.navigate(['/pokemon/all']); 
    } 
    // On crée une méthode qui s'occupe de la redirection 
    goEdit(pokemon: Pokemon): void { 
        let link = ['/pokemon/edit', pokemon.id]; 
           this.router.navigate(link); 
 }
   // Nouvelle méthode de suppression d’un Pokémon
    delete(pokemon: Pokemon): void { 
       this.pokemonsService.deletePokemon(pokemon).subscribe(_ => this.goBack());
}  
}