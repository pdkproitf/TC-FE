import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer }         from '@angular/platform-browser';

// create by pdk follow hong step
//input color -> output gradient color
//display-project-background: [style.background]="project.background | gradient"

@Pipe({
    name: 'gradient'
})
export class GradientPipe implements PipeTransform {

    constructor(private sanitizer: DomSanitizer) { }

    transform(background: any, args?: any): any {
        if (!background) return background;
        let rgb = this.hexToRgb(background);
        rgb.r -= 20; if (rgb.r<0) rgb.r=0;
        rgb.g -= 40; if (rgb.g<0) rgb.g=0;
        rgb.b -= 60; if (rgb.b<0) rgb.b=0;
        let newColor = this.rgbToHex(rgb);
        let linear = 'linear-gradient(180deg, #ffc259 0%, #ffb332 100%)';
        let linear0 = 'linear-gradient(180deg, ' + background + ' 0%, ' + newColor + ' 100%)';
        return this.sanitizer.bypassSecurityTrustStyle(linear0);
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
}
