import { Component, OnInit, ViewChild } from '@angular/core';

import { ServerHttpService } from '../../service/server.http.service';
import { Observable } from 'rxjs/Observable';

import { Product } from './product.object'
import { Category } from "../category/category.object";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers: [ ],
})
export class ProductComponent implements OnInit {
  
  product: Product;
  productList: Product[];
  productSearchValue: string = ' ';
  restRoute: string = 'produtoRest';

  constructor( private serverHttp: ServerHttpService ) { }

  ngOnInit() {
    this.product = new Product();

    this.searchProduct();
  }
  
  onSubmit() {
    if(this.product.idProduto) {
      return this.serverHttp.update(this.product, this.restRoute+'/editarProduto').subscribe(response => {
        alert(response);
        this.resetForm();

      })
    } else {
      return this.serverHttp.create(this.product, this.restRoute+'/addProduto').subscribe(
        response => { 
          this.searchProduct();
          this.resetForm();

        }
      )
    }
  }

  deleteProduct(id: number) {
    return this.serverHttp.delete(id, this.restRoute+'/deletarProduto').subscribe(
      response => { 
        this.searchProduct();
      }
    )
  }

  searchProduct() {
    return this.serverHttp.readByName(this.productSearchValue, this.restRoute+'/buscarProdutosPorNome').subscribe(response => {
      response.length > 0 ? this.productList = response : this.productList = undefined;
      
    })
  }

  editProduct(product: Product) {
    this.product = product;
  }

  resetForm() {
    this.product = new Product();
  }
  
}
