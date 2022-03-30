import { Component, Input, OnInit } from '@angular/core';

import { Hero } from '../models/hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../services/hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  hero?: Hero;

  constructor(
    private route: ActivatedRoute,
    private hs: HeroService,
    public location: Location) { }


  ngOnInit(): void {
    this.getHero();
  }

  async getHero() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.hero=await this.hs.getById(id);
  }

  async save():Promise<void>{
    
    if(this.hero){
      this.hero=await this.hs.update(this.hero);
      this.location.back();
    }
    
  }
}
