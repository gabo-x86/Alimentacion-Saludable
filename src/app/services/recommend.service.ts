import { Injectable } from '@angular/core';

import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import { Recommend } from '../models/recommend';

@Injectable({
  providedIn: 'root'
})
export class RecommendService {
  recommendList: AngularFireList<any>;
  selectedRecommend: Recommend = new Recommend();

  constructor(private firebase: AngularFireDatabase) { }

  getRecommend(){
    return this.recommendList = this.firebase.list('recommend');
  } 
  insertRecommend(recommend: Recommend){
    this.recommendList.push({
      category: recommend.category,
      portion: recommend.portion,
      ageMin: recommend.ageMin,
      ageMax: recommend.ageMax,
      weightMin: recommend.weightMin,
      weightMax: recommend.weightMax,
      heightMin: recommend.heightMin,
      heightMax: recommend.heightMax
    });
  }
}
