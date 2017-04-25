import { Router } from '@angular/router';
import { HeadersService } from './headers-service';
import { Headers, Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { ServerDomain } from '../models/server-domain';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class QuotesService {
    quotes: string[] = [
        'New office? Nice! Hope you enjoy the new home. Enjoy your work day.',
        'There are no secrets to success. It is the result of preparation, hard work, and learning from failure. - Colin Powell',
        'Life is 10% what happens to you and 90% how you react to it. - Charles R. Swindoll'
    ];
    generateQuote(): string {
        let len = this.quotes.length;
        let index = this.getRandomInt(0, len);
        return this.quotes[index];
    }
    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}
