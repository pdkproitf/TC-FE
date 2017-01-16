import { SpringTimeTrackerWebsiteFrontPage } from './app.po';

describe('spring-time-tracker-website-front App', function() {
  let page: SpringTimeTrackerWebsiteFrontPage;

  beforeEach(() => {
    page = new SpringTimeTrackerWebsiteFrontPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
