import { Component, Input, OnInit } from '@angular/core'; 
import { Router } from '@angular/router'; 
import { PokemonsService} from './pokemons.service'; 
import { Pokemon } from './pokemon'; 
 
@Component({ 
 selector: 'pokemon-form', 
 templateUrl: './pokemon-form.component.html',
 styleUrls: ['./pokemon-form.component.css'] 
}) 
export class PokemonFormComponent implements OnInit { 
 
    @Input() pokemon: Pokemon;  // propriété d'entrée du composant 
    types: Array<string>;// types disponibles pour un pokémon : 'Eau', 'Feu', etc.
    isAddForm: boolean; // Le formulaire est-il en mode ajout (ou édition) ?                       
 
 constructor( 
  private pokemonsService: PokemonsService, 
  private router: Router) { } 
 
 ngOnInit() { 
  
  this.types = this.pokemonsService.getPokemonTypes(); 
  this.isAddForm = this.router.url.includes('add');  
                                                  
  
 } 
  
 hasType(type: string): boolean {  // Détermine si le type passé en paramètres appartient ou non au pokémon en cours d'édition.  
  let index = this.pokemon.types.indexOf(type); 
  if (index > -1) return true; 
  return false; 
 }  
 
 // Méthode appelée lorsque l'utilisateur ajoute ou retire un type au pokémon en cours d'édition. 
 selectType($event: any, type: string): void { 
  let checked = $event.target.checked; 
  if (checked) { 
   // Si l'utilisateur coche un type, on l'ajoute à la liste des types du pokémon.
   this.pokemon.types.push(type); 
  } else { 
   // Si l'utilisateur décoche un type, on le retire à la liste des types du pokémon.
   let index = this.pokemon.types.indexOf(type); 
   if (index > -1) { 
    this.pokemon.types.splice(index, 1); 
   } 
  }  
 } 
 
  // La méthode appelée lorsque le formulaire est soumis est différente
 // en fonction du mode du formulaire. 
 // Nous effectuons deux actions différentes :
 //  * Soit on ajoute un nouveau Pokémon.
 //  * Soit on sauvegarde les modifications apportées sur un Pokémon.
    onSubmit(): void { 
        if (this.isAddForm) { // Le formulaire est en mode ajout.
            this.pokemonsService.addPokemon(this.pokemon).subscribe(pokemon => {
             this.pokemon = pokemon;
             this.goBack();
            });
           } else { // Le formulaire est en mode édition.
            this.pokemonsService.updatePokemon(this.pokemon).subscribe(_ => this.goBack());
           }
        }
   // J’ai découpé la redirection dans une méthode dédiée goBack
    goBack(): void {
        let link = ['/pokemons', this.pokemon.id];
          this.router.navigate(link);
   }
    
 
}