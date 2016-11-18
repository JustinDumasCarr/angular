import { FilesPage } from './app.po';

describe('files App', function() {
  let page: FilesPage;

  beforeEach(() => {
    page = new FilesPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
