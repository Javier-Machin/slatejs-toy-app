import React, { useState } from 'react';
import { Editor } from 'slate-react';
import Html from 'slate-html-serializer';
import rules from './htmlSerializerRules';

// Create a new serializer instance with our `rules` from above.
const html = new Html({ rules });

// Load the initial value from Local Storage or a default.
const initialValue = localStorage.getItem('content') || '<p></p>';

const App = () => {
  const [mainValue, setMainValue] = useState(html.deserialize(initialValue));

  const handleOnChange = ({ value }) => {
    // Check to see if the document has changed before saving.
    if (value.document !== mainValue.document) {
      const string = html.serialize(value);
      localStorage.setItem('content', string);
    }

    setMainValue(value);
  };

  const renderNode = (props, editor, next) => {
    switch (props.node.type) {
      case 'code':
        return (
          <pre {...props.attributes}>
            <code>{props.children}</code>
          </pre>
        );
      case 'paragraph':
        return (
          <p {...props.attributes} className={props.node.data.get('className')}>
            {props.children}
          </p>
        );
      case 'quote':
        return <blockquote {...props.attributes}>{props.children}</blockquote>;
      default:
        return next();
    }
  };

  // Add a `renderMark` method to render marks.
  const renderMark = (props, editor, next) => {
    const { mark, attributes } = props;
    switch (mark.type) {
      case 'bold':
        return <strong {...attributes}>{props.children}</strong>;
      case 'italic':
        return <em {...attributes}>{props.children}</em>;
      case 'underline':
        return <u {...attributes}>{props.children}</u>;
      default:
        return next();
    }
  };

  return (
    <Editor
      value={mainValue}
      onChange={handleOnChange}
      // Add the ability to render our nodes and marks...
      renderNode={renderNode}
      renderMark={renderMark}
    />
  );
};

export default App;
