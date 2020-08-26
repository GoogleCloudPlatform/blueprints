import {
    INITIALIZE_DATA, INIT_REQUEST, INIT_SUCCESS,
    INIT_NEW_SUCCESS, FORK_SUCCESS, FORK_WITHIN_WORKSPACE,
    DRAW_REQUEST, DRAW_SUCCESS, DRAW_FAILURE,
    CODE_CHANGED, EXAMPLE_SELECTED, ERROR_RESET,
    DIAGRAM_GET_SUCCESS, DIAGRAM_GET_FAILURE,
    REVISION_SELECTED, REVISIONS_REQUEST, REVISIONS_SUCCESS, REVISIONS_FAILURE, REVISION_TAB_CLICKED
} from '../actions/workspaceActions';
import {EXPORT_SUCCESS} from '../actions/exportActions';
import {SAVE_SUCCESS} from '../actions/saveActions';
import {DEFAULT_CODE} from '../../../config/editor';
import Diagram from '../../../models/Diagram';
import DiagramRevision from "../../../models/DiagramRevision";

const initialState = {
  loading: false,
  initialized: false,
  code: DEFAULT_CODE,
  submittedCode: '',
  drawing: false,
  loadError: null, // loadError is specifically for entering page error. Error msg on whole page.
  error: null,     // error is for rendering errors. Error msg as flash message on top of existing components.
  logs: [],
  svg: null,
  diagram: null,          // diagram represent the state in Edit-only View
  viewOnlyDiagram: null,  // viewOnlyDiagram represent the state in View-only View
  drewAt: null,
  loadingRevisions: false,
  revisions: [],
  revisionTabActive: false,
  revisionError: null,  // revisionError is specifically for revision preview loading.
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case INITIALIZE_DATA:
      return initialState;

    case INIT_REQUEST:
      return {
        ...initialState,
        loading: true,
        loadError: null,
      }

    case INIT_SUCCESS:
      return {
        ...state,
        initialized: true,
        revisionTabActive: true,  // Edit diagram default show
      };

    case INIT_NEW_SUCCESS:
      return {
        ...state,
        loading: false,
        revisionTabActive: false, // New diagram default not show
      }

    case DIAGRAM_GET_SUCCESS:
      let diagram, viewOnlyDiagram = null;
      // Upon getting a diagram response, we only populate
      // either `diagram` which is use for Edit-Only in workspace;
      // or `viewOnlyDiagram` which is use for View-Only in workspace
      // as both scenarios are using the same workspace (merge /edit and view page).
      if (action.data.ownername === window.currentUsername) { // Edit page.
        diagram = new Diagram(action.data)
      } else {
        viewOnlyDiagram = new Diagram(action.data)
      }
      return {
        ...state,
        loading: false,
        diagram: diagram,
        viewOnlyDiagram: viewOnlyDiagram,
        code: action.data.code
      }

    case DIAGRAM_GET_FAILURE:
      return {
        ...state,
        loading: false,
        code: '',   // Prevent change popup.
        loadError: action.error,
      }
    case FORK_WITHIN_WORKSPACE:
      return {
        ...state,
        revisionTabActive: false,   // New Diagram default not show revision.
      }

    case FORK_SUCCESS:
      return {
        ...state,
        loading: false,
        code: action.srcDiagram.code,
        revisionTabActive: false, // New diagram default not show
      }

    case DRAW_REQUEST:
      return {
        ...state,
        drawing: true,
        error: null,
      }

    case DRAW_SUCCESS:
      return {
        ...state,
        drawing: false,
        submittedCode: action.submittedCode,
        // previewUrl: action.previewUrl,
        // editUrl: action.editUrl,
        // title: action.title,
        drewAt: action.drewAt,
        svg: action.svg,
        logs: state.logs.concat([action.log])
      }

    case DRAW_FAILURE:
      return {
        ...state,
        drawing: false,
        error: action.error
      }

    case CODE_CHANGED:
      return {
        ...state,
        code: action.code
      }

    case EXAMPLE_SELECTED:
      return {
        ...state,
        code: action.code
      }

    case EXPORT_SUCCESS:
      return {
        ...state,
        logs: state.logs.concat([action.log])
      }

    case SAVE_SUCCESS:
      const latestRevision = new DiagramRevision({
        revisionId: action.data.revisionId,
        revisionAt: action.data.updatedAt,
        code: action.data.code,
      })
      let newRevisions;
      let revisionTabActive = state.revisionTabActive;
      if (state.revisions.length === 0) {   // Create Diagram first save (turn into Edit Page)
        newRevisions = [latestRevision]
        revisionTabActive = true;   // New -> Edit auto popup revision tab
      } else if (state.revisions[0].revisionId !== latestRevision.revisionId) {   // Save does trigger a new revision
        newRevisions = [latestRevision, ...state.revisions]
      } else {   // Code unchanged, save does not trigger a new revision
        newRevisions = state.revisions
      }
      return {
        ...state,
        logs: state.logs.concat([action.log]),
        diagram: new Diagram(action.data),
        revisions: newRevisions,
        revisionTabActive: revisionTabActive,
      }

    case REVISIONS_REQUEST:
      return {
        ...state,
        loadingRevisions: true,
        revisionError: null,
      }

    case REVISIONS_SUCCESS:
      return {
        ...state,
        loadingRevisions: false,
        revisions: DiagramRevision.modelsFromArray(action.revisions)
      }

    case REVISIONS_FAILURE:
      return {
        ...state,
        loadingRevisions: false,
        revisionError: action.error,
      }

    case REVISION_SELECTED:
      return {
        ...state,
        // Update Editor Code and Submitted code to not force
        // the user to save.
        code: action.code,
        submittedCode: action.code,
      }

    case REVISION_TAB_CLICKED:
      return {
        ...state,
        revisionTabActive: !state.revisionTabActive
      }

    case ERROR_RESET:
      return {
        ...state,
        error: null
      }

    default:
      return state;
  }
};

export default reducer;
