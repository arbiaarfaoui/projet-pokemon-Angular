import { NgModule } from '@angular/core'; 
import { RouterModule, Routes } from '@angular/router'; 

 
import { ListPokemonComponent } from './list-pokemon.component'; 
import { DetailPokemonComponent } from './detail-pokemon.component'; 
import { EditPokemonComponent } from './edit-pokemon.component'; 
import { AddPokemonComponent } from './add-pokemon.component'; //<- à importer
import { AuthGuard } from '../auth-guard.service'; 
 
// routes definition 
const pokemonsRoutes: Routes = [ 
 { path: 'pokemon',
 canActivate: [AuthGuard], 
  children: [ 
   { path: 'all', component: ListPokemonComponent },
   { path: 'pokemons/add', component: AddPokemonComponent }, //<- ajouter la route
   { path: 'pokemons/edit/:id', component: EditPokemonComponent, canActivate: [AuthGuard] },
   { path: 'pokemons/:id', component: DetailPokemonComponent },
  ]
}
]; 
 
@NgModule({ 
 imports: [ 
  RouterModule.forChild(pokemonsRoutes) 
 ], 
 exports: [ 
  RouterModule 
 ] 
}) 
export class PokemonRoutingModule { }