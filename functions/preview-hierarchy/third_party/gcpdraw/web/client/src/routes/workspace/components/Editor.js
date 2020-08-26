import React from 'react';
import {Controlled as CodeMirror} from 'react-codemirror2';
import {MODE_GCPDRAW} from '../../../config/codemirror';
import {shortcutKeyPrefix} from '../../../helpers/shortcutKey';

export const Editor = ({draw, code, drawing, onCodeChange, diagram, svg, forkedSourceId}) => {
  var extraKeys = {};
  if (drawing === false) {
    const keyPrefix = shortcutKeyPrefix();
    extraKeys[keyPrefix.KeyNameCodeMirror + '-Enter'] = (cm) => draw(code, diagram, svg, forkedSourceId);
  }

  return (
    <CodeMirror
      value={code}
      defineMode={MODE_GCPDRAW}
      className='editor'
      options={{
        mode: 'gcpdraw',
        theme: 'material',
        lineNumbers: true,
        extraKeys: extraKeys
      }}
      onBeforeChange={ (editor, data, value) => onCodeChange(value) }
    />
  );
};

export default Editor;
