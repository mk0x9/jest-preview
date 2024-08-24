import { debug } from '../../preview';
import fs from 'fs';
import { JSDOM } from 'jsdom';

jest.mock('fs');

const htmlWithoutDoctype = `
<html>
  <head>
    <title>test doc</title>
  </head>
  <body>
    <h1>Hello</h1>
  </body>
</html>
`;

const htmlWithDoctype = `<!doctype html>${htmlWithoutDoctype}`;

function setup(htmlString: string): void {
  const dom = new JSDOM(htmlString);

  jest
    .spyOn(window, 'document', 'get')
    .mockImplementation(() => dom.window.document);

  jest
    .spyOn(XMLSerializer.prototype, 'serializeToString')
    .mockImplementation((documentNode) =>
      new dom.window.XMLSerializer().serializeToString(documentNode),
    );
}

describe('debug', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('without doctype', () => {
    setup(htmlWithoutDoctype);
    debug();

    expect(fs.writeFileSync).toBeCalledWith(
      'node_modules/.cache/jest-preview/index.html',
      expect.stringMatching(/^<html/i),
    );
  });

  it('with doctype', () => {
    setup(htmlWithDoctype);
    debug();

    expect(fs.writeFileSync).toBeCalledWith(
      'node_modules/.cache/jest-preview/index.html',
      expect.stringMatching(/^<!doctype html><html/i),
    );
  });
});
