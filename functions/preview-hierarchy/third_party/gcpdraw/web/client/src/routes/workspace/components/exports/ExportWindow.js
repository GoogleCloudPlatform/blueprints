import React from 'react';
import Auth from './Auth';
import ExportToSlides from './ExportToSlides';
import Success from './Success';

const ExportWindow = ({workspace, exporter,
  authorize, closeExportWindow, exportToSlides}) => {
  const {isAuthorized, authorizing,
    exporting, exported, error, editUrl, previewUrl} = exporter;
  const {submittedCode} = workspace;

  return <React.Fragment>
    {!isAuthorized &&
      <Auth authorizing={authorizing}
        onCancel={closeExportWindow}
        onClick={authorize}
        error={error} />}

    {isAuthorized && !exported &&
      <ExportToSlides exporter={exporter}
        onCancel={closeExportWindow}
        error={error}
        exporting={exporting}
        editUrl={editUrl}
        code={submittedCode}
        exportToSlides={exportToSlides} />}

    {exported &&
      <Success
        previewUrl={previewUrl}
        editUrl={editUrl}
        onClose={closeExportWindow}
      />}

    </React.Fragment>
};

export default ExportWindow;
