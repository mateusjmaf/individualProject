import { Injectable, Output, EventEmitter } from '@angular/core';

import { Category } from './category.object';
import { ServerHttpService } from '../../service/server.http.service';

@Injectable()
export class CategoryService {
  
  @Output() categories = new EventEmitter<Category[]>();
  categoryList: Category[];
  category: Category;
  categorySearchValue: string = ' ';
  restRoute: string = 'categoriaRest';

  constructor(private serverHttp: ServerHttpService) { }

  createCategory() {
    return this.serverHttp.create(this.category, this.restRoute+'/addCategoria').subscribe(response => { 
      this.searchCategory();
    })
  }

  deleteCategory(id: number) {
    return this.serverHttp.delete(id, this.restRoute+'/deletarCategoria').subscribe(response => { 
      this.searchCategory();
      return null;
    })
  }

  searchCategory() {
    return this.serverHttp.readByName(this.categorySearchValue, this.restRoute+'/buscarCategoria');
  }

}
