import { FETCH_REQUESTS } from './actionTypes';
import { sendRequest, fetchRequests, alterRequest } from '../services/requests';
import { logError } from './error';

export const getRequests = (requests) => {
  return {
    type: FETCH_REQUESTS,
    requests,
  };
};

export const handleSendRequest = (request) => {
  return async (dispatch) => {
    try {
      await sendRequest(request);
      const requests = await fetchRequests();
      return dispatch(getRequests(requests));
    } catch (error) {
      return dispatch(logError('Request already sent'));
    }
  };
};

export const handleChangeRequest = (requestId, request) => {
  return async (dispatch) => {
    try {
      await alterRequest(requestId, request);
      const requests = await fetchRequests();
      return dispatch(getRequests(requests));
    } catch (error) {
      return dispatch(logError('Failed to make changes to request'));
    }
  };
};
