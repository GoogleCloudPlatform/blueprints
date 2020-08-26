import examples from '../../../config/examples';
import {formatDate} from '../../../helpers/util';
import Api from '../../../apis/DiagramApi';
import DrawApi from '../../../apis/DrawApi';
import {saveDiagram} from "./saveActions";
import Diagram from '../../../models/Diagram';

/*
 * Common
 */
// const handleErrors = (response) => {
//   // 4xx/5xx: response.ok == false
//   if (!response.ok) {
//     console.error('response', response);
//     return response.json().then((json) => { throw Error(json.error); });
//   }
//   return response;
// };

/*
 * Initialize
 */
export const INITIALIZE_DATA = 'workspace/initialize';
export const initializeData = () => {
  return {
    type: INITIALIZE_DATA
  }
};

export const INIT_REQUEST = 'workspace/init/request';
const initRequest = () => {
  return {
    type: INIT_REQUEST
  }
};

export const INIT_SUCCESS = 'workspace/init/success';
const initSuccess = () => {
  return {
    type: INIT_SUCCESS
  }
};

export const INIT_NEW_SUCCESS = 'workspace/initNew/success';
const initNewSuccess = () => {
  return {
    type: INIT_NEW_SUCCESS
  }
};

export const FORK_WITHIN_WORKSPACE = 'workspace/fork/inWorkspace';
const forkInWorkspace = () => {
  return {
    type: FORK_WITHIN_WORKSPACE,
  }
};

export const FORK_SUCCESS = 'workspace/fork/success';
const forkSuccess = (srcDiagram) => {
  return {
    type: FORK_SUCCESS,
    srcDiagram
  }
};

// Diagram Specific
export const DIAGRAM_GET_SUCCESS = 'diagram/get/success';
export const diagramGetSuccess = (data) => {
  return {
    type: DIAGRAM_GET_SUCCESS,
    data
  }
};

export const DIAGRAM_GET_FAILURE = 'diagram/get/failure';
export const diagramGetFailure = (error) => {
  return {
    type: DIAGRAM_GET_FAILURE,
    error
  }
};

export const initWorkspace = (id, srcId, code) => {
  return (dispatch) => {
    dispatch(initRequest());
    id ? dispatch(initEdit(id, code))
       : dispatch(initNew(srcId, code));
  }
};

export const initCopyWithinWorkspace = () => {
  return (dispatch) => {
    dispatch(forkInWorkspace())
  }
}

const initEdit = (id, code) => {
  return (dispatch) => {
    return Api.get(id)
      .then(res => {  // GetDiagram response
        const isOwner = res.data.ownername === window.currentUsername;
        dispatch(diagramGetSuccess(res.data));
        dispatch(initSuccess());
        dispatch(draw(res.data.code));
        if (!isOwner) {
          // No need to fetch revision if not owned by the user.
          // This can happen when viewing others diagram.
          return
        }
        dispatch(fetchRevisions(id));
      }).catch(error => {
        console.error(error);
        dispatch(diagramGetFailure(error.message));
      });
  };
};

const initNew = (srcId, code) => {
  return (dispatch) => {
    if(!srcId) {
      dispatch(initSuccess());
      dispatch(initNewSuccess());
      dispatch(draw(code));
    }
    else {
      return Api.get(srcId)
        .then(res => {
          dispatch(initSuccess());
          dispatch(forkSuccess(res.data));
          dispatch(draw(res.data.code));
        }).catch(error => {
          console.error(error);
          dispatch(diagramGetFailure(error.message));
        });
    }
  };
};


/*
 * Draw
 */
export const DRAW_REQUEST = 'workspace/draw/request';
const drawRequest = () => {
  return {
    type: DRAW_REQUEST
  }
};

export const DRAW_SUCCESS = 'workspace/draw/success';
const drawSuccess = (submittedCode, params) => {
  const timestamp = formatDate(new Date(), 'YYYY-MM-DD hh:mm:ss');
  return {
    type: DRAW_SUCCESS,
    submittedCode,
    svg: params.svg,
    drewAt: Date.now(),
    log: `[${timestamp}] Drawing done.`
  }
};

export const DRAW_FAILURE = 'workspace/draw/failure';
const drawFailure = (error) => {
  return {
    type: DRAW_FAILURE,
    error: error
  }
};

// draw will be triggered when user executes "draw" action from shortcut or clicking the draw icon.
// params:
// - code: latest code on the edit pane.
// - diagram: workspace.diagram state.
//   diagram will only be set after initial drawing on Edit page.
// - svg: workspace.svg state.
//   svg will only be set after initial drawing is complete.
//   an undefined svg will skip auto-save.
// - forkedSourceId: origin diagram ID if it is a copied diagram that is not saved.
//
// When entering the page for the first time & during first draw,
// diagram will always be null, svg will also be undefined as it hasn't been drawn yet.
// (First drawing doesn't require auto save)
// On subsequent draw, svg will be set. If diagram is still null, then it's
// on the New Diagram page, else it's on Edit diagram page.
export const draw = (code, diagram, svg, forkedSourceId) => {
  return (dispatch) => {
    dispatch(drawRequest());
    DrawApi.svg(code, false)
    .then(res => {
      dispatch(drawSuccess(code, res.data));
      if (typeof svg === 'undefined') {  // first rendering, no auto-save needed; or preview revision
        return
      }
      if (diagram == null) { // New Diagram Page
        // default auto-save to private.
        dispatch(saveDiagram({
          diagram: diagram,
          title: 'untitled diagram',
          diagramPermission: Diagram.PERMISSION.Private.value,
          code: code,
          forkedSourceId: forkedSourceId,
        }))
      } else { // Edit diagram page
        dispatch(saveDiagram({
          diagram: diagram,
          title: diagram.title,
          diagramPermission: diagram.permission,
          code: code
        }))
      }
    }).catch(error => {
      console.error(error);
      let msg = error.message;
      try {
        if(error.response.status === 400
          || error.response.status === 403
          || error.response.status === 404) {
          msg = error.response.data.error;
        }
      } catch (e) {
        console.error(e);
      }
      dispatch(drawFailure(msg));
    });
  }
};

/*
 * Code Change
 */
export const CODE_CHANGED = 'workspace/code/change';
export const onCodeChange = (code) => {
  return {
    type: CODE_CHANGED,
    code
  }
};

/*
 * Examples
 */
export const EXAMPLE_SELECTED = 'workspace/example/selected';
export const onExampleSelected = (exampleId) => {
  let example = null;
  examples.forEach(eg => {
    if(eg.id === exampleId) { example = eg; }
  });

  return {
    type: EXAMPLE_SELECTED,
    code: example.code
  }
};

/*
 * Error
 */
export const ERROR_RESET = 'workspace/error/reset';
export const onErrorReset = () => {
  return {
    type: ERROR_RESET
  }
}


/*
* Revisions
*/
export const REVISIONS_REQUEST = 'workspace/revisions/request';
const revisionsRequest = () => {
  return {
    type: REVISIONS_REQUEST
  }
};

export const REVISIONS_SUCCESS = 'workspace/revisions/success';
const revisionsSuccess = (revisions) => {
  return {
    type: REVISIONS_SUCCESS,
    revisions: revisions
  }
};

export const REVISIONS_FAILURE = 'workspace/revisions/failure';
const revisionsFailure = (error) => {
  return {
    type: REVISIONS_FAILURE,
    error: error
  }
};

export const fetchRevisions = (id) => {
  return (dispatch) => {
    dispatch(revisionsRequest());
    Api.revisions(id)
      .then(res => {
        dispatch(revisionsSuccess(res.data.revisions));
      }).catch(error => {
      console.error(error.message);
      dispatch(revisionsFailure(error.message));
    });
  }
};

export const REVISION_SELECTED = 'workspace/revision/selected';
export const revisionSelected = (code) => {
  return {
    type: REVISION_SELECTED,
    code
  }
};

export const onPreviewRevision = (code) => {
  return (dispatch) => {
    dispatch(revisionSelected(code))
    // purposely skipping auto-save since user is only previewing a revision
    dispatch(draw(code, null, undefined))
  }
}

export const REVISION_TAB_CLICKED = 'workspace/revision/tab/click';
export const onRevisionTabClick = () => {
  return {
    type: REVISION_TAB_CLICKED,
  }
};
