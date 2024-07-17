import { Component, OnInit, ViewChild, viewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NytimesService } from '../services/nytimes.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Article } from '../interface';
import { IonInfiniteScroll } from '@ionic/angular';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  @ViewChild( IonInfiniteScroll, {static: true} ) infiniteScroll!: IonInfiniteScroll;

  public categories: string[] = ['business' ,'entertainment' ,'general' ,'health' ,'science' ,'sports' ,'technology'];
  public selectedCategory: string = this.categories[0];
  public articles: Article[] = [];

  constructor(private router: Router, private nytimesService: NytimesService, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.nytimesService.getTopHeadlinesByCategory(this.selectedCategory)
    .subscribe( articles => {
      this.articles = [...articles]
    })
  }

  irPagSalvos() {
    this.router.navigate(['/tabs/tab1']);
  }

  getSanitizedUrl(url: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  segmentChanged(event: Event) {
    this.selectedCategory = (event as CustomEvent).detail.value;
    this.nytimesService.getTopHeadlinesByCategory(this.selectedCategory)
    .subscribe( articles => {
      this.articles = [...articles]
    })
  }

  loadData() {
    this.nytimesService.getTopHeadlinesByCategory(this.selectedCategory, true)
      .subscribe( articles => {

        if (articles.length === this.articles.length) {
          this.infiniteScroll.disabled = true;
          return;
        }
        
        this.articles = articles;
        this.infiniteScroll.complete();
      })
  }

}
