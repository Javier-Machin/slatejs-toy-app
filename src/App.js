/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Editor } from 'slate-react';
import { Value } from 'slate';
import CodeNode from './components/CodeNode';
import { set } from 'immutable';

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
    // Return with no changes if it's not the "`" key with ctrl pressed.
    if (event.key !== "'" || !event.ctrlKey) return next();

    // Prevent the "`" from being inserted by default.
    event.preventDefault();

    // Determine whether any of the currently selected blocks are code blocks.
    const isCode = editor.value.blocks.some(block => block.type === 'code');

    // Toggle the block type depending on `isCode`.
    editor.setBlocks(isCode ? 'paragraph' : 'code');
  };

  return (
    <>
      <Editor
        value={value}
        onChange={handleOnChange}
        onKeyDown={handleOnKeyDown}
        renderNode={renderNode}
      />
    </>
  );
};

export default App;
