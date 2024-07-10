import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { Iproduct } from '../../interfaces';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../../services/product.service';
import { ProductFormComponent } from '../product-form/product-form.component'; 

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule,ModalComponent,ProductFormComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',

})
export class ProductListComponent implements OnChanges{

  @Input() productList:Iproduct[]=[]
  
  private productService=inject(ProductService)

  public modalservice=inject(NgbModal)

  public currentPro:Iproduct={}

  @Input() permisionON:boolean=false

  showProductModal(product:Iproduct,modal:any){
    this.currentPro={...product};
    modal.show()
  }

  onFormCallEvent(param:any){
    this.productService.updateP(param)
    this.modalservice.dismissAll()
  }
  
  deletePro(id:number){
    this.productService.deleteP(id)
  }


  ngOnChanges(changes: SimpleChanges): void {
    if(changes["permisionON"]){
      console.log("Its Allowed",this.permisionON)
    }
  }

}
