import React from 'react';

const BLOCK_TAGS = {
  blockquote: 'quote',
  p: 'paragraph',
  pre: 'code'
};

// Add a dictionary of mark tags.
const MARK_TAGS = {
  em: 'italic',
  strong: 'bold',
  u: 'underline'
};

export default [
  {
    // The el argument that the deserialize function receives is just a DOM element.
    // And the next argument is a function that will deserialize any element(s) we pass it,
    // which is how you recurse through each node's children.

    // Add our first rule with a deserializing function.
    deserialize(el, next) {
      const type = BLOCK_TAGS[el.tagName.toLowerCase()];

      if (type) {
        return {
          object: 'block',
          type: type,
          data: {
            className: el.getAttribute('class')
          },
          nodes: next(el.childNodes)
        };
      }
    },
    // The serialize function is taking Slate models and turning them into React elements,
    // which will then be rendered to an HTML string.
    // The object argument of the serialize function will either be a Node, a Mark or a special immutable String object.
    // The children argument is a React element describing the nested children of the object in question, for recursing.

    // Add a serializing function property to our rule...
    serialize(obj, children) {
      if (obj.object === 'block') {
        switch (obj.type) {
          case 'paragraph':
            return <p className={obj.data.get('className')}>{children}</p>;
          case 'quote':
            return <blockquote>{children}</blockquote>;
          case 'code':
            return (
              <pre>
                <code>{children}</code>
              </pre>
            );
          default:
            throw new Error('block serialize: obj type not valid');
        }
      }
    }
  },
  // Add a new rule that handles marks...
  {
    deserialize(el, next) {
      const type = MARK_TAGS[el.tagName.toLowerCase()];
      if (type) {
        return {
          object: 'mark',
          type: type,
          nodes: next(el.childNodes)
        };
      }
    },
    serialize(obj, children) {
      if (obj.object === 'mark') {
        switch (obj.type) {
          case 'bold':
            return <strong>{children}</strong>;
          case 'italic':
            return <em>{children}</em>;
          case 'underline':
            return <u>{children}</u>;
          default:
            throw new Error('mark serialize: obj type not valid');
        }
      }
    }
  }
];
