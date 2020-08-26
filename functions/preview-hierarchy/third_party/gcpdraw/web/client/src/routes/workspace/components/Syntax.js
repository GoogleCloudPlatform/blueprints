import React from 'react';
import {UnControlled as CodeMirror} from 'react-codemirror2';
import SYNTAX from '../../../config/syntax';
import {MODE_GCPDRAW} from '../../../config/codemirror';


const Keyword = (props) => {
  const {keyword, image, example, classNameAddOn} = props.keyword;
  return (
    <tr>
      <td>
        <div className='font-weight-bold mb-1'>{keyword}</div>
        {image &&
          <img src={image}
               alt={keyword}
               className='gd-syntax-image' /> }
      </td>
      <td>
        <div className=''>
          <CodeMirror
            value={example}
            defineMode={MODE_GCPDRAW}
            className={`gd-syntax-viewer ${classNameAddOn}`}
            options={{
              mode: 'gcpdraw',
              theme: 'material',
              lineNumbers: false,
              readOnly: true
            }} />
        </div>
      </td>
    </tr>
  );
};

const Syntax = (props) => (
  <table className='table table-bordered'>
    <thead>
      <tr>
        <th>Component</th>
        <th>Syntax</th>
      </tr>
    </thead>
    <tbody>
      {SYNTAX.map( (s,i) => <Keyword key={i} keyword={s} /> )}
    </tbody>
  </table>
);

export default Syntax;
