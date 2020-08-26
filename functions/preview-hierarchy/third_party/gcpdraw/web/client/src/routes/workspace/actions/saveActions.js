import Api from '../../../apis/DiagramApi';
import {formatDate} from '../../../helpers/util';

/*
 * Save Window Manipulation
 */
export const OPEN_SAVE_WINDOW = 'diagram/save/prompt';
export const openSaveWindow = () => {
  return {
    type: OPEN_SAVE_WINDOW
  }
};

export const CLOSE_SAVE_WINDOW = 'diagram/save/close';
export const closeSaveWindow = () => {
  return {
    type: CLOSE_SAVE_WINDOW
  }
};

/*
 * Save Diagram
 */
export const SAVE_REQUEST = 'diagram/save/request';
const saveRequest = () => {
  return {
    type: SAVE_REQUEST
  }
};

export const SAVE_SUCCESS = 'diagram/save/success';
const saveSuccess = (data) => {
  const timestamp = formatDate(new Date(), 'YYYY-MM-DD hh:mm:ss');
  const log = `[${timestamp}] Saved.`;

  return {
    type: SAVE_SUCCESS,
    data,
    receivedAt: Date.now(),
    log
  }
};

export const SAVE_FAILURE = 'diagram/save/failure';
const saveFailure = (error) => {
  return {
    type: SAVE_FAILURE,
    error: error.message
  }
};

export const saveDiagram = ({diagram, title, diagramPermission, code, forkedSourceId}) => {
  return (dispatch) => {
    const req = diagram ?
      Api.update({...diagram.payload, title, permission: diagramPermission, code},
        diagram.id)
      : Api.create({title, permission: diagramPermission, code, originId: forkedSourceId});
    dispatch(saveRequest());
    req.then(res => {
      dispatch(saveSuccess(res.data));
    }).catch( (e) => {
      console.error('saveFailure', e);
      dispatch(saveFailure(e));
    })
  }
};
