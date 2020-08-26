import Api from '../../../apis/DiagramApi';
// import DrawApi from '../../../apis/DrawApi';

export const INITIALIZE = 'diagrams/initialize';
export const initializeData = () => {
    return {
      type: INITIALIZE
    }
};

export const DIAGRAMS_LIST = 'diagrams/list/request';
const diagramsList = () => {
  return {
    type: DIAGRAMS_LIST
  }
}

export const DIAGRAMS_LIST_SUCCESS = 'diagrams/list/success';
const diagramsListSuccess = (data, query) => {
  return {
    type: DIAGRAMS_LIST_SUCCESS,
    query,
    data
  }
};

export const DIAGRAMS_LIST_FAILURE = 'diagrams/list/failure';
const diagramsListFailure = (error) => {
  return {
    type: DIAGRAMS_LIST_FAILURE,
    error
  }
};

export const listDiagrams = (params = {}) => {
  return (dispatch) => {
    dispatch(diagramsList());
    return Api.list(params)
      .then(res => {
        dispatch(diagramsListSuccess(res.data));
      }).catch(error => {
        console.error(error)
        dispatch(diagramsListFailure(error.message))
      })
  }
};

// export const DIAGRAMS_DRAW_SUCCESS = 'diagrams/draw/success';
// const diagramsDrawSuccess = (id, data) => {
//   return {
//     type: DIAGRAMS_DRAW_SUCCESS,
//     id: id,
//     svg: data.svg
//   }
// }
//
// export const drawDiagrams = (diagrams = []) => {
//   const apis = [];
//
//   return (dispatch) => {
//
//   }
// };

export const searchDiagrams = (query) => {
  return (dispatch) => {
    dispatch(diagramsList());
    return Api.list({query})
      .then(res =>
        dispatch(diagramsListSuccess(res.data, query))
      ).catch(error => {
        console.error(error)
        dispatch(diagramsListFailure(error.message))
      })
  }
};
