import { NeptunePage } from './app.po';

describe('neptune App', function() {
  let page: NeptunePage;

  beforeEach(() => {
    page = new NeptunePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
