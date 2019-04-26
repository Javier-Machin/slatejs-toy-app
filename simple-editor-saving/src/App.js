import React, { useState } from 'react';

import { Editor } from 'slate-react';
import { Value } from 'slate';

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

const App = () => {
  const [value, setValue] = useState(initialValue);

  const handleOnChange = ({ value }) => {
    const content = JSON.stringify(value.toJSON());
    localStorage.setItem('content', content);
    setValue(value);
  };

  return <Editor value={value} onChange={handleOnChange} />;
};

export default App;
