import { Message } from 'primeng/primeng';
import { UserService } from '../../services/user-service';
import { User, UserPost } from '../../models/user';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  user: User = new User();
  userPost: UserPost = new UserPost();
  msgs: Message[] = [];
  constructor(private router: Router, private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit() {
    let para = this.route.params['_value'];
    console.log(para);
    if (para.companyDomain !== null) {
      this.user.company_domain = para.companyDomain;
    }
    if (para.email !== null) {
      this.user.email = para.email;
    }
  }

  log(): void {
    console.log(this.user);
  }

  signIn(): void {
    console.log('signin');
    this.userPost.user = this.user;
    console.log('somehow');
    this.userService.signIn(this.userPost)
    .then((res) => {
      localStorage.setItem('UserInfo', JSON.stringify(res));
      let obj = localStorage.getItem('UserInfo');
      this.router.navigate(['/dashboard']);
      }, (error) => {
        let content = JSON.parse(error['_body']).error;
        this.msgs = [];
        this.msgs.push({severity: 'error', summary: 'Error', detail: content});
      }
    );
  }

  signUp() {
    this.router.navigate(['sign-up']);
  }
}
