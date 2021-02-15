import { fetchApartments } from '../services/apartments';
import { getApartments } from './apartments';
import { hideLoading, showLoading } from './loading';

const getInitialData = async () => {
  const [apartments] = await Promise.all([fetchApartments()]);

  return {
    apartments,
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
