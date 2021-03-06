import { Component, OnInit, ViewChild } from '@angular/core';

import { ServerHttpService } from '../../service/server.http.service';

import { ModalAction } from '../modal/moda.interface.component';
import { ModalComponent } from '../modal/modal.component';
import { Product } from './product.object';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers: [ ],
})
export class ProductComponent implements OnInit {

  idProduct: number;
  product: Product;
  productList: Product[];
  productSearchValue = ' ';
  restRoute = 'produtoRest';

  primaryActionDelete: ModalAction = {
    action: () => {
      this.modalProductDelete.hide();
      this.deleteProduct(this.idProduct);
    }
  };

  @ViewChild('modalProductDelete') modalProductDelete: ModalComponent;

  constructor( private serverHttp: ServerHttpService ) { }

  ngOnInit() {
    this.product = new Product();

    this.searchProduct();
  }

  onSubmit() {
    if (this.product.idProduto) {
      return this.serverHttp.update(this.product, this.restRoute + '/editarProduto').subscribe(response => {
        alert(response);
        this.resetForm();

      });
    } else {
      return this.serverHttp.create(this.product, this.restRoute + '/addProduto').subscribe( response => {
        this.searchProduct();
        this.resetForm();
      });
    }
  }

  confirmExclusion(idProduct) {
    this.idProduct = idProduct;
    this.modalProductDelete.show();
  }

  deleteProduct(id: number) {
    return this.serverHttp.delete(id, this.restRoute + '/deletarProduto').subscribe( response => {
      this.searchProduct();
    });
  }

  searchProduct() {
    return this.serverHttp.readByName(this.productSearchValue, this.restRoute + '/buscarProdutosPorNome').subscribe(response => {
      response.length > 0 ? this.productList = response : this.productList = undefined;
    });
  }

  editProduct(product: Product) {
    this.product = product;
  }

  resetForm() {
    this.product = new Product();
  }

}
