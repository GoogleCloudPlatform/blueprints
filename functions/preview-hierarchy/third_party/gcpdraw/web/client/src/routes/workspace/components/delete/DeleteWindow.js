import React from 'react';
import Prompt from './Prompt';
import Success from './Success';


const DeleteWindow = ({workspace, deleter,
  closeDeleteWindow, deleteDiagram}) => {
  const {deleting, deleted, error} = deleter;
  const {diagram} = workspace;

  return <React.Fragment>
    {!deleted &&
      <Prompt
        diagram={diagram}
        onCancel={closeDeleteWindow}
        onSubmit={deleteDiagram.bind(this, diagram)}
        error={error}
        deleting={deleting} />}
    {deleted && <Success onClose={closeDeleteWindow} />}
    </React.Fragment>
};

export default DeleteWindow;
