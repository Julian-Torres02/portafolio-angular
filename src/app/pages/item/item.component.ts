import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Routes } from '@angular/router';
import { ProductosService } from '../../services/productos.service';
import { ProductoDescripcion } from '../../interFaces/producto-descripcion.interface';
import { Producto } from '../../interFaces/producto.interface';


@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit { 
  
  producto!: ProductoDescripcion;
  id!:string;

  constructor(private route: ActivatedRoute,
              public productoService: ProductosService ) { }
  ngOnInit() {

    this.route.params
    .subscribe( parametros => {
      // console.log(parametros['id']);
      this.productoService.getProducto(parametros['id'])
      .subscribe((producto: any)  => {
        this.id = parametros['id'];
        this.producto = producto;

      });
    });
  }

}
