import { Component, Input } from '@angular/core';
import { Article } from 'src/app/interface';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Share } from '@capacitor/share';
import { ActionSheetController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent {

  @Input() article!: Article;
  @Input() index!: number;

  constructor( 
    private iab: InAppBrowser,
    private platform: Platform,
    private actionSheetCtrl: ActionSheetController,
  ) { }

  openArticle() {
    if (this.platform.is('ios') || this.platform.is('android')) {
      const browser = this.iab.create( this.article.url);
      browser.show();
      return;
    }

    window.open( this.article.url, '_blank');
  }

  async onOpenMenu() {
    
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'options',
      buttons: [
        {
          text: 'share',
          icon: 'share-outline',
          handler: () => this.onShareArticle()
        },
        {
          text: 'favorite',
          icon: 'heart-outline',
          handler: () => this.onToggleFavorite()
        }
      ]
    });

    await actionSheet.present();
  }
  
  onShareArticle = async () => {
    await Share.share({
      title: this.article.title,
      text: this.article.description,
      url: this.article.url,
    });
  }

  onToggleFavorite() {
    console.log('toggle favorite');
  }

}