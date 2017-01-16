import { SpringTimeTrackerDevPage } from './app.po';

describe('spring-time-tracker-dev App', function() {
  let page: SpringTimeTrackerDevPage;

  beforeEach(() => {
    page = new SpringTimeTrackerDevPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
