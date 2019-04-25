/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Editor } from 'slate-react';
import { Value } from 'slate';
import CodeNode from './components/renderers/CodeNode';
import BoldMark from './components/renderers/BoldMark';

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
      return <BoldMark {...props} />;
    default:
      return next();
  }
};

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

  const handleOnKeyDown = (event, editor, next) => {
    if (!event.ctrlKey) return next();

    // Decide what to do based on the key code...
    switch (event.key) {
      // When "B" is pressed, add a "bold" mark to the text.
      case 'b': {
        event.preventDefault();
        editor.toggleMark('bold');
        break;
      }
      // When "`" is pressed, keep our existing code block logic.
      case "'": {
        const isCode = editor.value.blocks.some(block => block.type === 'code');
        event.preventDefault();
        editor.setBlocks(isCode ? 'paragraph' : 'code');
        break;
      }
      // Otherwise, let other plugins handle it.
      default: {
        return next();
      }
    }
  };

  return (
    <>
      <Editor
        value={value}
        onChange={handleOnChange}
        onKeyDown={handleOnKeyDown}
        renderNode={renderNode}
        renderMark={renderMark}
      />
    </>
  );
};

export default App;
