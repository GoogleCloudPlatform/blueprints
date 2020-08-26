import gapiParams from '../../../config/gapi';
import {formatDate} from '../../../helpers/util';

/*
 * Status Check
 */
const getAuthStatus = () => {
  const res = window.gapi.auth2.getAuthInstance()
              .currentUser.get().getAuthResponse(true);
  return !!res;
};

/*
 * Common
 */
const handleErrors = (response) => {
  // 4xx/5xx: response.ok == false
  if (!response.ok) {
    console.error('response', response);
    return response.json().then((json) => { throw Error(json.error); });
  }
  return response;
};


/*
 * open
 */
export const OPEN_EXPORT_WINDOW = 'workspace/export/openWindow';
export const openExportWindow = () => {
  return {
    type: OPEN_EXPORT_WINDOW
  }
};


export const CLOSE_EXPORT_WINDOW = 'workspace/export/closeWindow';
export const closeExportWindow = () => {
  return {
    type: CLOSE_EXPORT_WINDOW
  }
};


/*
 * Auth Check
 */
export const AUTH_CHECK_REQUEST = 'workspace/authCheck/request';
const authCheckRequest = () => {
  return {
    type: AUTH_CHECK_REQUEST
  }
};

export const AUTH_CHECK_SUCCESS = 'workspace/authCheck/success';
const authCheckSuccess = (auth) => {
  return {
    type: AUTH_CHECK_SUCCESS,
    receivedAt: Date.now(),
    isAuthorized: auth
  }
};

export const AUTH_CHECK_FAILURE = 'workspace/authCheck/failure';
const authCheckFailure = (error) => {
  console.error(error);
  return {
    type: AUTH_CHECK_FAILURE,
    error: error.error
  }
};

export const authCheck = () => {
  return (dispatch) => {
    dispatch(authCheckRequest());
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init(gapiParams)
        .then(() => {
          dispatch(authCheckSuccess( getAuthStatus() ));
        })
        .catch((error) => {
          console.error('authCheck', error);
          dispatch(authCheckFailure(error));
        });
    });
  }
};

/*
 * Authorize
 */
export const AUTHORIZE_REQUEST = 'workspace/auth/request';
const authRequest = () => {
  return {
    type: AUTHORIZE_REQUEST
  }
};

export const AUTHORIZE_SUCCESS = 'workspace/auth/success';
const authSuccess = () => {
  return {
    type: AUTHORIZE_SUCCESS,
    receivedAt: Date.now()
  }
};

export const AUTHORIZE_FAILURE = 'workspace/auth/failure';
const authFailure = (error) => {
  return {
    type: AUTHORIZE_FAILURE,
    error: error
  }
};

export const authorize = () => {
  return (dispatch) => {
    dispatch(authRequest());
    const googleAuth = window.gapi.auth2.getAuthInstance();
    googleAuth.signIn()
      .then(() => {
        dispatch(authSuccess())
      })
      .catch((error) => {
        console.error(`authorize error: ${error}`);
        dispatch(authFailure(error))
      });
  }
};

//
// For Google Slide
//
/*
 * Draw
 */
export const EXPORT_REQUEST = 'workspace/export/request';
const exportRequest = () => {
  return {
    type: EXPORT_REQUEST
  }
};

export const EXPORT_SUCCESS = 'workspace/export/success';
const exportSuccess = (code, params) => {
  const timestamp = formatDate(new Date(), 'YYYY-MM-DD hh:mm:ss');
  const log = `[${timestamp}] Exported to Google Slides.`;

  return {
    type: EXPORT_SUCCESS,
    previewUrl: params.previewUrl,
    editUrl: params.editUrl,
    title: params.title,
    receivedAt: Date.now(),
    log
  }
};

export const EXPORT_FAILURE = 'workspace/export/failure';
const exportFailure = (error) => {
  return {
    type: EXPORT_FAILURE,
    error: error.message
  }
};

export const exportToSlides = (code, editUrl) => {
  const authResponse = window.gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse(true);
  const body = JSON.stringify({
    accessToken: authResponse.access_token,
    code: code,
    slideUrl: editUrl
  });

  return (dispatch) => {
    dispatch(exportRequest());
    // TODO (stabata): replace this with DrawApi for consistency.
    fetch('/render/slide', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: body,
    }).then(handleErrors)
    .then((res) => {
      return res.json();
    }).then( (json) => {
      dispatch(exportSuccess(code, json));
    }).catch( (e) => {
      console.error('exportFailure', e);
      dispatch(exportFailure(e));
    });
  }
};
