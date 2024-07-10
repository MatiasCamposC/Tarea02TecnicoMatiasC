import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../services/auth.service';
import { ProductListComponent } from '../../components/product-list/product-list.component';
import { ProductFormComponent } from '../../components/product-form/product-form.component';
import { LoaderComponent } from '../../components/loader/loader.component';
import { ModalComponent } from '../../components/modal/modal.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [ProductListComponent,ProductFormComponent,LoaderComponent,ModalComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})

export class ProductComponent implements OnInit {
 
  public productService=inject(ProductService)
  public modalservice=inject(NgbModal)
  public route:ActivatedRoute=inject(ActivatedRoute)
  public autServices:AuthService=inject(AuthService)
  public routeAuthorities:string[]=[]
  public permisionON:boolean=false

  onFormCallEvent(param:any){
    console.log(param)
    this.productService.saveP(param)
    this.modalservice.dismissAll()
  }

  ngOnInit(): void {
    this.productService.getP();
    this.autServices.getUserAuthorities();
    this.route.data.subscribe((data)=>{
      this.routeAuthorities=data["authorities"]?data["authorities"]:[]
      this.permisionON=this.autServices.areActionsAvailable(this.routeAuthorities)
    })
  }
}