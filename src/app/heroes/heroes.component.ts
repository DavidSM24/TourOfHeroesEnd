import { Component, OnInit } from '@angular/core';
import { Hero } from '../models/hero';
import { HeroService } from '../services/hero.service';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  
  selectedHero?:Hero;
  heroes:Hero[] = [];

  constructor(
    private hs:HeroService,
    private ms:MessageService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  async getHeroes(){
    this.heroes=await this.hs.getAll();
  }

  
  async add(name:string):Promise<void>{
    name=name.trim();

    if(name){
      let newHero:Hero={
        name: name
      }
      newHero=await this.hs.add(newHero);
      if(newHero!=null&&newHero.id){
        this.heroes.push(newHero);
      }
    }
  }


  async delete(hero:Hero){
    this.hs.delete(hero);
    this.heroes.splice(this.heroes.indexOf(hero),1);   
  }

}
