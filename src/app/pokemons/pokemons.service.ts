import { Injectable } from '@angular/core'; 

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Pokemon } from './pokemon';

 
@Injectable({
 providedIn: 'root',
}) 
export class PokemonsService { 
  // le point d’accés à notre API
	private pokemonsUrl = 'api/pokemons';

   constructor(private http: HttpClient) { }
   
   // Après (avec une requête Http) 
   getPokemons(): Observable<Pokemon[]> { 
   return this.http.get<Pokemon[]>(this.pokemonsUrl).pipe(
    tap(_ => this.log(`fetched pokemons`)),
    catchError(this.handleError('getPokemons', []))
   ); 
  }
   
   getPokemon(id: number): Observable<Pokemon> { 
      const url =`${this.pokemonsUrl}/${id}`; // syntaxe ES6  
        return this.http.get<Pokemon>(url).pipe(
          tap(_ => this.log(`fetched pokemon id=${id}`)),
             catchError(this.handleError<Pokemon>(`getPokemon id=${id}`))
   );
  }

  //La méthode updatePokemon persiste les modifications du pokémon via l’API :
   updatePokemon(pokemon: Pokemon): Observable<Pokemon> { 
      const httpOptions = { headers: new HttpHeaders({'Content-Type': 'application/json'}) };
 
   return this.http.put(this.pokemonsUrl, pokemon, httpOptions).pipe( 
      tap(_ => this.log(`updated pokemon id=${pokemon.id}`)),
         catchError(this.handleError<any>('updatePokemon'))
 );
}
   // La méthode de suppression à ajouter dans le service des Pokémons :
   deletePokemon(pokemon : Pokemon): Observable<Pokemon> {
       const url = `${this.pokemonsUrl}/${pokemon.id}`;
         const httpOptions = {
              headers: new HttpHeaders({ 'Content-Type': 'application/json' })
   };
        return this.http.delete<Pokemon>(url, httpOptions).pipe(
            tap(_ => this.log(`deleted pokemon id=${pokemon.id}`)),
              catchError(this.handleError<Pokemon>('deletePokemon'))
   );
  }
  /** POST pokemon */
   addPokemon(pokemon: Pokemon): Observable<Pokemon> {
       const httpOptions = {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' })
   };
        return this.http.post<Pokemon>(this.pokemonsUrl, pokemon, httpOptions).pipe(
          tap((pokemon: Pokemon) => this.log(`added pokemon with id=${pokemon.id}`)),
             catchError(this.handleError<Pokemon>('addPokemon'))
   );
  }

  /* GET pokemons search */
  searchPokemons(term: string): Observable<Pokemon[]> { 
   if (!term.trim()) {
    // Si le terme de recherche n'existe pas,
    // on renvoie un tableau vide sous la forme d’un Observable avec ‘of’.
    return of([]);
   }
   return this.http.get<Pokemon[]>(`api/pokemons/?name=${term}`).pipe(
    tap(_ => this.log(`found pokemons matching "${term}"`)),
    catchError(this.handleError<Pokemon[]>('searchPokemons', []))
   );
  }

    // Retourne la liste de tous les types possibles pour un pokémon
    getPokemonTypes(): Array<string> { 
       return [ 
            'Plante', 'Feu', 'Eau', 'Insecte', 'Normal', 'Electrik',
                'Poison', 'Fée', 'Vol', 'Combat', 'Psy' 
    ]; 
   }
   /* handleError */

	private handleError<T>(operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {
			console.error(error);
			console.log(`${operation} failed: ${error.message}`);
			return of(result as T);
		};
}
     /* log */

   private log(log: string) {
       console.info(log);

}
}