/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Editor } from 'slate-react';
import { Value } from 'slate';

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
                text: 'A line of text in a paragraph.',
              },
            ],
          },
        ],
      },
    ],
  },
});

const App = () => {
  const [value, setValue] = useState(initialValue)

  const HandleOnChange = ({ value }) => {
    setValue(value);
  }

  const HandleOnKeyDown = (event, editor, next) => {
    // Return with no changes if the keypress is not '&'
    if (event.key !== '&') return next()

    // Prevent the ampersand character from being inserted.
    event.preventDefault()

    // Change the value by inserting 'and' at the cursor's position.
    editor.insertText('and')
  }

  return ( 
    <Editor 
      value={value} 
      onChange={HandleOnChange} 
      onKeyDown={HandleOnKeyDown} 
    />
  );
}

export default App;
