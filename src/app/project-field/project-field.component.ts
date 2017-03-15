import { CategoryInProject } from './../models/category-in-project';
import { ProjectJoin } from './../models/project-join';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-project-field',
  templateUrl: './project-field.component.html',
  styleUrls: ['./project-field.component.scss']
})
export class ProjectFieldComponent implements OnInit {
  @Input()
  myProject: ProjectJoin;
  _currentCategory = new CategoryInProject();

  backgroundImage;

  @Input()
  set currentCategory(arg) {
    this._currentCategory = arg;
    /* if (this._currentCategory.project !== this.myProject.name) {
      let len = this.classBtns.length;
      for (let j = 0; j < len; j++) {
        this.classBtns[j] = 'play-btn';
      }
    }*/
  }
  get currentCategory() {
    return this._currentCategory;
  }
  classBtns = [];
  hidden = false;
  @Output()
  outCategory = new EventEmitter<CategoryInProject>();

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
    let len = this.myProject.category.length;
    for (let i = 0; i < len; i++) {
      this.classBtns.push('play-btn');
    }
    let rgb = this.hexToRgb(this.myProject.background);
    rgb.r -= 20; if (rgb.r<0) rgb.r=0;
    rgb.g -= 40; if (rgb.g<0) rgb.g=0;
    rgb.b -= 60; if (rgb.b<0) rgb.b=0;
    let newColor = this.rgbToHex(rgb);
    let linear = 'linear-gradient(180deg, #ffc259 0%, #ffb332 100%)';
    let linear0 = 'linear-gradient(180deg, ' + this.myProject.background + ' 0%, ' + newColor + ' 100%)';
    this.backgroundImage = this.sanitizer.bypassSecurityTrustStyle(linear0);
  }
  hexToRgb(hex) {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
  }
  rgbToHex(rgb) {
    return '#' +
    ('0' + rgb.r.toString(16)).slice(-2) +
    ('0' + rgb.g.toString(16)).slice(-2) +
    ('0' + rgb.b.toString(16)).slice(-2);
  }
  changeClass(i): void {
    /* let len = this.classBtns.length;
    for (let j = 0; j < len; j++) {
      if (j !== i) {
        this.classBtns[j] = 'play-btn';
      }
    }
    this.classBtns[i] = this.classBtns[i] === 'play-btn' ? 'stop-btn' : 'play-btn';*/
    let outCat = new CategoryInProject();
    outCat.category = this.myProject.category[i].name;
    outCat.project = this.myProject.name;
    outCat.category_member_id = this.myProject.category[i].category_member_id;
    outCat.color = this.myProject.background;
    this.outCategory.emit(outCat);
  }

  hideProj() {
    this.hidden = true;
  }

  showProj() {
    this.hidden = false;
  }
}
