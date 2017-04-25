import { QuotesService } from './../../services/quotes-service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-funny-quotes',
  templateUrl: './funny-quotes.component.html',
  styleUrls: ['./funny-quotes.component.scss']
})
export class FunnyQuotesComponent implements OnInit {
  content: string = '';
  isShow: boolean = true;
  constructor(private quotesService: QuotesService) { }

  ngOnInit() {
    this.content = this.quotesService.generateQuote();
  }

}
