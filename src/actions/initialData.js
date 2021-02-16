import { fetchApartments } from '../services/apartments';
import { getApartments } from './apartments';
import { fetchRequests } from '../services/requests';
import { getRequests } from './requests';
import { hideLoading, showLoading } from './loading';

const getInitialData = async () => {
  const [apartments] = await Promise.all([fetchApartments()]);

  return {
    apartments,
  };
};

const getAuthedData = async () => {
  const [requests] = await Promise.all([fetchRequests()]);

  return {
    requests,
  };
};

export const handleInitialData = () => {
  return async (dispatch) => {
    dispatch(showLoading());
    return getInitialData()
      .then(({ apartments }) => {
        dispatch(getApartments(apartments));
        dispatch(hideLoading());
      })
      .catch(() => dispatch(hideLoading()));
  };
};

export const handleAuthedData = () => {
  return async (dispatch) => {
    dispatch(showLoading());
    return getAuthedData()
      .then(({ requests }) => {
        dispatch(getRequests(requests));
        dispatch(hideLoading());
      })
      .catch(() => dispatch(hideLoading()));
  };
};
