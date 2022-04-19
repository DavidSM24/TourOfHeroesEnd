import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { Hero } from '../models/hero';
import { HeroService } from '../services/hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  charged: boolean = false;

  heroes: Hero[] = [];

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.getHeroes();
    this.charged = true;
  }

  async getHeroes(): Promise<void> {
    this.heroes= (await this.heroService.getAll()).slice(0,5);

  }

}
