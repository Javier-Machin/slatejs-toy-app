/* eslint-disable no-unused-vars */
import React from 'react';

export default function CodeNode(props) {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  );
}
