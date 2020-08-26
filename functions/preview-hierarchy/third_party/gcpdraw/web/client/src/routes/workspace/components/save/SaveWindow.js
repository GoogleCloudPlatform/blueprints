import React from 'react';
import SaveForm from './SaveForm';
import Success from './Success';


const SaveWindow = ({workspace, saver, closeSaveWindow,
  saveDiagram, isNew}) => {
  const {saving, saved, error} = saver;
  const {code, diagram} = workspace;

  return <React.Fragment>
    {!saved &&
      <SaveForm saver={saver}
        diagram={diagram}
        onCancel={closeSaveWindow}
        isNew={isNew}
        submit={saveDiagram}
        error={error}
        saving={saving}
        code={code} />}

    {saved && <Success onClose={closeSaveWindow} />}
    </React.Fragment>
};

export default SaveWindow;
