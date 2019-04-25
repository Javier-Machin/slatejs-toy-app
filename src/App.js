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

// Define our app...
const App = () => {
  // Set the initial value when the app is first constructed.
  const [value, setValue] = useState(initialValue)

  // On change, update the app's React state with the new editor value.
  const onChange = ({ value }) => {
    setValue(value);
  }

  // Render the editor.
  return ( 
    <Editor value={value} onChange={onChange} />
  );
}

export default App;
