import Api from '../../../apis/DiagramApi';

/*
 * Delete Window Manipulation
 */
export const OPEN_DELETE_WINDOW = 'diagram/delete/prompt';
export const openDeleteWindow = () => {
  return {
    type: OPEN_DELETE_WINDOW
  }
};

export const CLOSE_DELETE_WINDOW = 'diagram/delete/close';
export const closeDeleteWindow = () => {
  return {
    type: CLOSE_DELETE_WINDOW
  }
};


/*
 * Delete Diagram
 */
export const DELETE_REQUEST = 'diagram/delete/request';
const deleteRequest = () => {
  return {
    type: DELETE_REQUEST
  }
};

export const DELETE_SUCCESS = 'diagram/delete/success';
const deleteSuccess = (data) => {
  return {
    type: DELETE_SUCCESS,
    data
  }
};

export const DELETE_FAILURE = 'diagram/delete/failure';
const deleteFailure = (error) => {
  return {
    type: DELETE_FAILURE,
    error: error.message
  }
};

export const deleteDiagram = (diagram) => {
  return (dispatch) => {
    dispatch(deleteRequest());
    Api.delete(diagram.id)
      .then(res => {
        dispatch(deleteSuccess(res.data));
      }).catch( (e) => {
        console.error('deleteFailure', e);
        dispatch(deleteFailure(e));
      });
  }
};
