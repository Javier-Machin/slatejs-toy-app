/* eslint-disable no-case-declarations */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Editor } from 'slate-react';
import { Value } from 'slate';
import CodeNode from './components/renderers/CodeNode';
import Reveal from './components/marks/RevealMark';

const existingValue = JSON.parse(localStorage.getItem('content'));

const initialValue = Value.fromJSON(
  existingValue || {
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
  }
);

const renderNode = (props, editor, next) => {
  switch (props.node.type) {
    case 'code':
      return <CodeNode {...props} />;
    case 'revealGroup':
      return <Reveal {...props} />;
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
    case 'reveal':
      return <Reveal>{props.children}</Reveal>;
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

const MakeRevealGroup = options => {
  const { key } = options;
  return {
    onKeyDown(event, editor, next) {
      if (!event.ctrlKey || event.key !== key) return next();
      event.preventDefault();
      // const buttonText = prompt('button?');
      editor.value.fragment.nodes.size > 1
        ? editor.wrapBlock('revealGroup')
        : editor.unwrapBlock('revealGroup');
    }
  };
};

// Initialize a plugin for each mark...
const plugins = [
  MarkHotkey({ key: 'b', type: 'bold' }),
  MarkHotkey({ key: "'", type: 'code' }),
  MarkHotkey({ key: 'º', type: 'strikethrough' }),
  MarkHotkey({ key: 'i', type: 'italic' }),
  MarkHotkey({ key: 'u', type: 'underline' }),
  MarkHotkey({ key: 'r', type: 'reveal' }),
  MakeRevealGroup({ key: 'h' })
];

const App = () => {
  const [mainValue, setMainValue] = useState(initialValue);

  const handleOnChange = ({ value }) => {
    // Check to see if the document has changed before saving.
    if (value.document !== mainValue.document) {
      const content = JSON.stringify(value.toJSON());
      localStorage.setItem('content', content);
    }
    setMainValue(value);
  };

  // if (mainValue.fragment.nodes._tail) {
  //   mainValue.fragment.nodes._tail.array.some(block => {
  //     if (block) {
  //       console.log(block.type);
  //     }
  //   });
  // }

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
        value={mainValue}
        onChange={handleOnChange}
        renderNode={renderNode}
        renderMark={renderMark}
      />
    </>
  );
};

export default App;
