import { marked } from 'marked';

marked.setOptions({
  breaks: true,
  gfm: true
});

function Markdown({ content }) {
  if (!content) return null;

  const html = marked.parse(content);

  return (
    <div
      className="markdown-content"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export default Markdown;
