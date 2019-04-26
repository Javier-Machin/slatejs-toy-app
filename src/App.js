/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Editor } from 'slate-react';
import { Value } from 'slate';
import CodeNode from './components/renderers/CodeNode';

const initialValue = Value.fromJSON({
  document: {
    nodes: [
      {
        object: 'block',
        type: 'paragraph',
        nodes: [
          {
            object: 'text',
            leaves: [
              {
                text: 'A line of text in a paragraph.'
              }
            ]
          }
        ]
      }
    ]
  }
});

// Add a `renderNode` method to render a `CodeNode` for code blocks.
const renderNode = (props, editor, next) => {
  switch (props.node.type) {
    case 'code':
      return <CodeNode {...props} />;
    default:
      return next();
  }
};

// Add a `renderMark` method to render marks.
const renderMark = (props, editor, next) => {
  switch (props.mark.type) {
    case 'bold':
      return <strong>{props.children}</strong>;
    case 'code':
      return <code>{props.children}</code>;
    case 'italic':
      return <em>{props.children}</em>;
    case 'strikethrough':
      return <del>{props.children}</del>;
    case 'underline':
      return <u>{props.children}</u>;
    default:
      return next();
  }
};

// maps keys with mark types
const MarkHotkey = options => {
  const { type, key } = options;

  // Return our "plugin" object, containing the `onKeyDown` handler.
  return {
    onKeyDown(event, editor, next) {
      // If it doesn't match our `key`, let other plugins handle it.
      if (!event.ctrlKey || event.key !== key) return next();

      // Prevent the default characters from being inserted.
      event.preventDefault();

      // Toggle the mark `type`.
      editor.toggleMark(type);
    }
  };
};

// Initialize a plugin for each mark...
const plugins = [
  MarkHotkey({ key: 'b', type: 'bold' }),
  MarkHotkey({ key: "'", type: 'code' }),
  MarkHotkey({ key: 'i', type: 'italic' }),
  MarkHotkey({ key: 'º', type: 'strikethrough' }),
  MarkHotkey({ key: 'u', type: 'underline' })
];

const App = () => {
  const [value, setValue] = useState(initialValue);

  const handleOnChange = ({ value }) => {
    setValue(value);
  };

  // // replaces '&' with 'and'
  // const HandleOnKeyDown = (event, editor, next) => {
  // 	// Return with no changes if the keypress is not '&'
  // 	if (event.key !== '&') return next();

  // 	// Prevent the ampersand character from being inserted.
  // 	event.preventDefault();

  // 	// Change the value by inserting 'and' at the cursor's position.
  // 	editor.insertText('and');
  // };

  return (
    <>
      <Editor
        plugins={plugins}
        value={value}
        onChange={handleOnChange}
        renderNode={renderNode}
        renderMark={renderMark}
      />
    </>
  );
};

export default App;
