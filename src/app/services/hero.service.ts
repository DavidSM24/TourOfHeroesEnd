import { Injectable } from '@angular/core';
import { Hero } from '../models/hero';
import { MessageService } from './message.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';
import { error } from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroesUrl = 'http://localhost:8081/heroes';

  constructor(
    private ms: MessageService,
    private http: HttpClient) {

  }

  public async getAll(): Promise<Hero[]> {

    let promise:Promise<Hero[]> = new Promise((resolve, reject) => {
      this.http.get(this.heroesUrl)
        .subscribe((data:any)=>{
          resolve(data);
        })
    });
    return promise;
  }

  
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Hero[]>(this.heroesUrl+"/name/"+term)
      .pipe(
        tap(x => x.length ? this.log(`Héroe encontrados con: "${term}"`) : this.log(`No héroes encontrados con: "${term}"`)),
        catchError(this.handleError<Hero[]>('searchHeroes', []))
      );
  }


  getById(id: number): Promise<Hero> {
    let promise:Promise<Hero> = new Promise((resolve, reject) => {
      this.http.get(this.heroesUrl+"/id/"+id)
        .subscribe((data:any)=>{
          resolve(data);
        })
    });
    return promise;
  }

  public async add(hero: Hero): Promise<any> {

    if(hero!=null&&hero.name!=null&&hero.name.length>0){
      
      const body=hero;

      let promise:Promise<Hero> = new Promise((resolve, reject) => {
        this.http.post(this.heroesUrl,body)
          .subscribe((data:any)=>{
            this.log("Héroe añadido: "+hero.name);
            resolve(data);
          })
      });
      return promise;
    }
  }
  
  public async update(hero: Hero): Promise<any> {
    
    const body=hero;

    if(hero&&hero.id&&hero.name!=null&&hero.name.length>0){
      let promise:Promise<Hero> = new Promise((resolve, reject) => {
        this.http.put(this.heroesUrl,body)
          .subscribe((data:any)=>{
            this.log("Héroe modificado: "+hero.name);
            resolve(data);
          })
      });
      return promise;
    }

    
  }

  public async delete(hero: Hero): Promise<boolean> {
    try {
      
      let promise:Promise<boolean> = new Promise((resolve, reject) => {
        this.http.delete(this.heroesUrl+"/"+hero.id)
          .subscribe((data:any)=>{
            this.log("Héroe eliminado: "+hero.name);
            resolve(true);
          })
      });
      return promise;
    } catch (error) {
      //this.log("heroService:"+error);
      return new Promise((resolve,reject)=>{
        resolve(false);
      })
    }
    

  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.log((`${operation} failed: ${error.message}`));

      return of(result as T)
    }
  }


  private log(message: string) {
    this.ms.add(`HeroService: ${message}`);
  }

}
