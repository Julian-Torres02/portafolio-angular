import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InfoPagina } from '../interFaces/info-pagina.interFace';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info: InfoPagina = {};
  cargada = false;
  equipo: any[] = [];


  constructor( private http: HttpClient){
    // console.log('Servicio de infoPagina listo');
    
    this.cargarInfo();
    this.CargarEquipo();
    }

    private cargarInfo(){
     // Leer el archivo JSON
     this.http.get('assets/data/data-pagina.json')
     .subscribe( (resp: InfoPagina) => {
       this.cargada = true;
       this.info = resp;
     });
    }

    private CargarEquipo(){
      // Leer Equipo
      this.http.get('https://angular-html-73b41-default-rtdb.firebaseio.com/Nombre.json')
      .subscribe( (resp: any) => {
        this.equipo = resp;
      });


    }

  }

