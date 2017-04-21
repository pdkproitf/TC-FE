import { CategoryInProject } from '../../models/category-in-project';
import { ProjectJoinService } from '../../services/project-join-service';
import { ProjectJoin } from '../../models/project-join';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-project-field-list',
  templateUrl: './project-field-list.component.html',
  styleUrls: ['./project-field-list.component.scss']
})
export class ProjectFieldListComponent implements OnInit {
  projectJoins: ProjectJoin[] = [];
  projectJoinsSearch: ProjectJoin[] = [];
  classImageSearch = 'fa fa-search imgspan';
  searchPattern = '';
  varTimeOut;
  @Output()
  outCategory = new EventEmitter<CategoryInProject>();
  @Output()
  outProjectJoins = new EventEmitter<ProjectJoin[]>();
  @Input()
  currentCategory = new CategoryInProject();
  isLoading = false;
  constructor(private projectJoinService: ProjectJoinService) { }

  ngOnInit() {
    this.isLoading = true;
    this.projectJoinService.getProjectJoin()
    .then(res => {
      this.projectJoins = res;
      console.log(this.projectJoins);
      this.outProjectJoins.emit(this.projectJoins);
      this.filterProjectJoin('');
      this.isLoading = false;
    })
    .catch(err => {
      console.log(err);
      this.isLoading = false;
    });
  }

  selectCategory(arg) {
    this.outCategory.emit(arg);
    // this.currentCategory = arg;
  }

  onBlur() {
    if (this.searchPattern === '') {
      this.classImageSearch = 'fa fa-search imgspan';
    }
  }

  onFocus() {
    this.classImageSearch = 'fa fa-search imghidden';
  }

  filterProjectJoin(arg: string) {
    this.projectJoinsSearch = [];
    for (let project of this.projectJoins) {
      if (project.name.indexOf(arg) > -1) {
        this.projectJoinsSearch.push(project);
      }
    }
  }

  doFilter() {
    clearTimeout(this.varTimeOut);
    this.varTimeOut = setTimeout(() => this.filterProjectJoin(this.searchPattern), 2000);
  }

}
