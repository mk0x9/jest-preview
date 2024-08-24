import { JSDOM } from 'jsdom';
import { serializeDoctypeToString } from '../../utils';

// https://www.w3.org/QA/2002/04/valid-dtd-list.html
const HTML5Doctype = '<!DOCTYPE html>';
const HTML401StrictDoctype =
  '<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">';
const HTML401TransitionalDoctype =
  '<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">';
const HTML401FramesetDoctype =
  '<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Frameset//EN" "http://www.w3.org/TR/html4/frameset.dtd">';
const XHTML11Doctype =
  '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">';
const XHTML11BasicDoctype =
  '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML Basic 1.1//EN" "http://www.w3.org/TR/xhtml-basic/xhtml-basic11.dtd">';
const XHTML10StrictDoctype =
  '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">';
const XHTML10TransitionDoctype =
  '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">';
const XHTML10FramesetDoctype =
  '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Frameset//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd">';

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

function setup(htmlString: string): JSDOM {
  const dom = new JSDOM(htmlString);
  jest
    .spyOn(XMLSerializer.prototype, 'serializeToString')
    .mockImplementation((documentNode) =>
      new dom.window.XMLSerializer().serializeToString(documentNode),
    );
  return dom;
}

describe('serializeDoctypeToString', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('no doctype', () => {
    const dom = setup(htmlWithoutDoctype);

    expect(serializeDoctypeToString(dom.window.document)).toBe('');
  });

  it('HTML5', () => {
    const dom = setup(HTML5Doctype + htmlWithoutDoctype);

    expect(serializeDoctypeToString(dom.window.document)).toBe(HTML5Doctype);
  });

  it('HTML 4.01 Strict', () => {
    const dom = setup(HTML401StrictDoctype + htmlWithoutDoctype);

    expect(serializeDoctypeToString(dom.window.document)).toBe(
      HTML401StrictDoctype,
    );
  });

  it('HTML 4.01 Transitional', () => {
    const dom = setup(HTML401TransitionalDoctype + htmlWithoutDoctype);

    expect(serializeDoctypeToString(dom.window.document)).toBe(
      HTML401TransitionalDoctype,
    );
  });

  it('HTML 4.01 Frameset', () => {
    const dom = setup(HTML401FramesetDoctype + htmlWithoutDoctype);

    expect(serializeDoctypeToString(dom.window.document)).toBe(
      HTML401FramesetDoctype,
    );
  });

  it('XHTML 1.1', () => {
    const dom = setup(XHTML11Doctype + htmlWithoutDoctype);

    expect(serializeDoctypeToString(dom.window.document)).toBe(XHTML11Doctype);
  });

  it('XHTML 1.1 Basic', () => {
    const dom = setup(XHTML11BasicDoctype + htmlWithoutDoctype);

    expect(serializeDoctypeToString(dom.window.document)).toBe(
      XHTML11BasicDoctype,
    );
  });

  it('XHTML 1.0 Strict', () => {
    const dom = setup(XHTML10StrictDoctype + htmlWithoutDoctype);

    expect(serializeDoctypeToString(dom.window.document)).toBe(
      XHTML10StrictDoctype,
    );
  });

  it('XHTML 1.0 Transitional', () => {
    const dom = setup(XHTML10TransitionDoctype + htmlWithoutDoctype);

    expect(serializeDoctypeToString(dom.window.document)).toBe(
      XHTML10TransitionDoctype,
    );
  });

  it('XHTML 1.0 Frameset', () => {
    const dom = setup(XHTML10FramesetDoctype + htmlWithoutDoctype);

    expect(serializeDoctypeToString(dom.window.document)).toBe(
      XHTML10FramesetDoctype,
    );
  });
});
