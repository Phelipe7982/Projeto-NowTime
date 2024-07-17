import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Article, ArticleByCategoryAndPage, Nytime } from '../interface';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class NytimesService {

  private articleByCategoryAndPage: ArticleByCategoryAndPage = {};

  constructor(private http: HttpClient) { }

  private executeQuery<T>(endpoint: string) {
    return this.http.get<T>(`${apiUrl}${endpoint}`, {
      params: {
        apiKey: apiKey,
        country: 'us',
      }
    })
  }

  getArticles(): Observable<Article[]> {
    return this.getTopHeadlinesByCategory('business');
  }

  getTopHeadlinesByCategory(category: string, loadMore: boolean = false ) :Observable<Article[]> {
    
    if (loadMore) {
      return this.getArticlesByCategory(category);
    }

    if (this.articleByCategoryAndPage[category]) {
      return of(this.articleByCategoryAndPage[category].articles);
    }
    
    return this.getArticlesByCategory(category);
  }

  private getArticlesByCategory( category: string): Observable<Article[]> {
    
    if ( Object.keys(this.articleByCategoryAndPage).includes(category) ) {
      // this.articleByCategoryAndPage[category].page += 0;
    } else {
      this.articleByCategoryAndPage[category] = {
        page: 0,
        articles: []
      }
    }

    const page = this.articleByCategoryAndPage[category].page + 1;

    return this.executeQuery<Nytime>(`/top-headlines?category=${ category }&page=${ page }`)
    .pipe (
      map( ({ articles }) => {

        if (articles.length === 0 ) return this.articleByCategoryAndPage[category].articles;

        this.articleByCategoryAndPage[category] = {
          page: page,
          articles: [...this.articleByCategoryAndPage[category].articles, ...articles]
        }

        return this.articleByCategoryAndPage[category].articles;
      })
      );
  }

}
