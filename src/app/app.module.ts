import { NgModule } from '@angular/core'; 
// On importe le service 'Title'.
import { BrowserModule, Title } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; 

import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module'; 
import { LoginRoutingModule } from './login-routing.module';
import { PokemonsModule } from './pokemons/pokemons.module';
 
import { AppComponent } from './app.component'; 
import { PageNotFoundComponent } from './page-not-found.component';
import { LoginComponent } from './login.component'; 


import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api'; 
import { InMemoryDataService } from './in-memory-data.service'; 
 




 
@NgModule({ 
 // L'odre de chargement des modules est très important
 // par rapport à l'ordre de déclaration des routes !
 imports: [ 
  BrowserModule, 
  HttpClientModule,
  HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, { dataEncapsulation: false }), 
  FormsModule,
  PokemonsModule,
  LoginRoutingModule, // <- ici, au-dessus du AppRoutingModule ! 
  AppRoutingModule, // pour l'ordre de déclaration des routes ! 
 
  
 ], 
 declarations: [ 
  AppComponent, 
  LoginComponent, // <- ... et ici ! 
  PageNotFoundComponent 
 ], 
 providers: [ 
    Title // On fournis le service 'Title' à l’ensemble de l’application.
 ], 

 bootstrap: [AppComponent] 
}) 
export class AppModule { }
