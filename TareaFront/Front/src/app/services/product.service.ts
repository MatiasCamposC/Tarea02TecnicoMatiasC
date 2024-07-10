import { Injectable, signal } from '@angular/core';
import { Iproduct } from '../interfaces';
import { BaseService } from './base-service';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseService<Iproduct>{

  protected override source: string="Product"
  private ProductListSig=signal<Iproduct[]>([])

  get product$(){
    return this.ProductListSig
  }

  public getP(){
    this.findAll().subscribe({
      next:(resProduct:any)=>{
        this.ProductListSig.set(resProduct)
      },
      error:(er:any)=>{console.log(er)}
    })
  }

  public saveP(productS:Iproduct){
    this.add(productS).subscribe({
      next:(productSave:any)=>{
        this.ProductListSig.update((products:Iproduct[])=>[productSave,...products])
      },
      error:(er:any)=>{console.log(er)}
    })
  }

  public updateP(productU:Iproduct){
    this.edit(productU.id,productU).subscribe({
      next:()=>{
        const updatePro=this.ProductListSig().map((product:Iproduct)=>product.id===productU.id ? productU:product);
        this.ProductListSig.set(updatePro)
      },
      error:(er:any)=>{console.log(er)}
    })
  }

  public deleteP(id:number){
    this.del(id).subscribe({
      next:()=>{
        const deletePro=this.ProductListSig().filter((product:Iproduct)=>product.id !== id);
        this.ProductListSig.set(deletePro)
      },
      error:(er:any)=>{console.log(er)}
    })
  }
}
