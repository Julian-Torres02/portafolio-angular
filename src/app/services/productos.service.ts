import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interFaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: Producto[] = [];
  productosFiltrado: Producto[] = [];

  constructor(private http: HttpClient) {

    this.cargarProductos();
   }

   private cargarProductos() {

    return new Promise(( resolve, reject) => {
      this.http.get('https://angular-html-25cf9.firebaseio.com/productos_idx.json')
          .subscribe( (resp: any ) => {
            this.productos = resp;
            this.cargando = false;
            resolve('');
      });
    });

  }

  getProducto(id: string){

    return this.http.get(`https://angular-html-73b41-default-rtdb.firebaseio.com/productos/${id}.json`)

  }
  buscarProducto(termino: string){

    if( this.productos.length === 0){
      // Cargar productos
      this.cargarProductos().then(() => {
        // ejecutar después de tener los productos
        // Aplicar filtro
        this.filtrarProductos( termino);
      })
    }
    else{
      // aplicar el filtro
      this.filtrarProductos( termino);
    }
  }
  private filtrarProductos(termino: string){

    this.productosFiltrado = [];

    termino = termino.toLocaleUpperCase();

    this.productos.forEach( prod => {
      const tituloLower = prod.titulo.toLocaleLowerCase();
      if( prod.categoria.indexOf( termino )>= 0 || prod.titulo.indexOf( termino)>= 0 ){
        this.productosFiltrado.push( prod );

      }

    });
  }
}

    
