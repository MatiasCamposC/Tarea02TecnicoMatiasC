import { Injectable, signal } from '@angular/core';
import { BaseService } from './base-service';
import { Icategory } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseService<Icategory> {

  protected override source: string="Category"
  private categoryListSig=signal<Icategory[]>([])

  get category$(){
    return this.categoryListSig
  }

  public getC(){
    this.findAll().subscribe({
      next:(resCategory:any)=>{
        this.categoryListSig.set(resCategory)
      },
      error:(er:any)=>{console.log(er)}
    })
  }


  public saveC(categoryS:Icategory){
    this.add(categoryS).subscribe({
      next:(categorySave:any)=>{
        this.categoryListSig.update((categories:Icategory[])=>[categorySave,...categories])
      },
      error:(er:any)=>{console.log(er)}
    })
  }

  public updateC(categoryU:Icategory){
    this.edit(categoryU.id,categoryU).subscribe({
      next:()=>{
        const updateCate=this.categoryListSig().map((category)=>category.id===categoryU.id ? categoryU:category);
        this.categoryListSig.set(updateCate)
      },
      error:(er:any)=>{console.log(er)}
    })
  }

  public deleteC(id:number){
    this.del(id).subscribe({
      next:()=>{
        const deleteCate=this.categoryListSig().filter((category:Icategory)=>category.id !== id);
        this.categoryListSig.set(deleteCate)
      },
      error:(er:any)=>{console.log(er)}
    })
  }

}

