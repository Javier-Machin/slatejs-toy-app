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
  const [mainValue, setMainValue] = useState(initialValue);

  const handleOnChange = ({ value }) => {
    // Check to see if the document has changed before saving.
    if (value.document !== mainValue.document) {
      const content = JSON.stringify(value.toJSON());
      localStorage.setItem('content', content);
    }

    setMainValue(value);
  };

  return <Editor value={mainValue} onChange={handleOnChange} />;
};

export default App;
