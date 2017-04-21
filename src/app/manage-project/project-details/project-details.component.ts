import { Component, OnInit, Input } from '@angular/core';
import { ProjectGetOne }   from '../../models/project';
import { Router, Params }   from '@angular/router';
import { ActivatedRoute }   from '@angular/router';
import { ProjectService }   from '../../services/project-service';

@Component({
    selector: 'app-project-details',
    templateUrl: './project-details.component.html',
    styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {
    isLoading = false;
    project: ProjectGetOne;
    constructor(private route: ActivatedRoute, private projectService: ProjectService, private router: Router) {
    }

    ngOnInit() {
        this.isLoading = true;
        this.projectService.getProject(this.route.snapshot.params['id']).then(
        (result) => {
            this.project = result;
            this.isLoading = false;
        },
        (error) => {
            alert(error);
            this.isLoading = false;
        });
    }

    // go to in here after click to SAVE button
    save(project: ProjectGetOne){
        console.log('save');
    }
    // go to in here after click to DELETE button
    delete(project: ProjectGetOne){
        console.log('delete');
    }
    // go to in here after click to EDIT button
    edit(){
        this.router.navigate(['/edit-project/'+this.project.id]);
    }
}
