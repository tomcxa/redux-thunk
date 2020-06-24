import {
  CHANGE_SERVICE_FIELD,
  FETCH_SERVICES_REQUEST,
  FETCH_SERVICES_FAILURE,
  FETCH_SERVICES_SUCCESS,
  ADD_SERVICE_REQUEST,
  ADD_SERVICE_FAILURE,
  ADD_SERVICE_SUCCESS,
  REMOVE_SERVICE_REQUEST,
  REMOVE_SERVICE_FAILURE,
  REMOVE_SERVICE_SUCCESS,
  GET_SERVICE_REQUEST,
  GET_SERVICE_FAILURE,
  GET_SERVICE_SUCCESS,
  EDIT_SERVICE_REQUEST,
  EDIT_SERVICE_FAILURE,
  EDIT_SERVICE_SUCCESS,
  EDIT_SERVICE_FIELD
} from './actionTypes';

export const fetchServicesRequest =() => ({
  type: FETCH_SERVICES_REQUEST,
});

export const fetchServicesFailure = error => ({
  type: FETCH_SERVICES_FAILURE,
  payload: {
    error,
  },
});

export const fetchServicesSuccess = items => ({
  type: FETCH_SERVICES_SUCCESS,
  payload: {
    items,
  },
});

export const addServiceRequest = (name, price) => ({
  type: ADD_SERVICE_REQUEST,
  payload: {
    name,
    price,
  },
})

export const addServiceFailure = error => ({
  type: ADD_SERVICE_FAILURE,
  payload: {
    error,
  },
});

export const addServiceSuccess = () => ({
  type: ADD_SERVICE_SUCCESS,
});

export const changeServiceField = (name, value) => ({
  type: CHANGE_SERVICE_FIELD,
  payload: {
    name,
    value,
  },
});

export const editServiceField = (name, value) => ({
  type: EDIT_SERVICE_FIELD,
  payload: {
    name,
    value,
  },
});

export const removeServiceRequest = id => ({
  type: REMOVE_SERVICE_REQUEST,
  payload: {
    id,
  },
});

export const removeServiceFailrule = error => ({
  type: REMOVE_SERVICE_FAILURE,
  payload: {
    error,
  },
});

export const removeServiceSuccess = () => ({
  type: REMOVE_SERVICE_SUCCESS,
});

export const getServiceRequest = id => ({
  type: GET_SERVICE_REQUEST,
  payload: {
    id,
  },
});

export const getServiceFailure = error => ({
  type: GET_SERVICE_FAILURE,
  payload: {
    error,
  },
});

export const getServiceSuccess = (item) => ({
  type: GET_SERVICE_SUCCESS,
  payload: {
    item,
  }
});

export const editServiceRequest = () => ({
  type: EDIT_SERVICE_REQUEST,
  // payload: {
  //   item,
  // },
});

export const editServiceFailure = error => ({
  type: EDIT_SERVICE_FAILURE,
  payload: {
    error,
  },
});

export const editServiceSuccess = () => ({
  type: EDIT_SERVICE_SUCCESS,
});

export const fetchServices = () => async (dispatch) => {
  dispatch(fetchServicesRequest());

  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}`);

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = await response.json();

    dispatch(fetchServicesSuccess(data));
  } catch (error) {
    dispatch(fetchServicesFailure(error.message));
  }
};

export const getService = (id) => async (dispatch) => {
  dispatch(getServiceRequest(id));

  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/${id}`);

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = await response.json();

    dispatch(getServiceSuccess(data));
  } catch (error) {
    dispatch(getServiceFailure(error.message));
  }
};

export const addService = () => async (dispatch, getState) => {
  dispatch(addServiceRequest());
  const {serviceAdd: {item: {name, price}}} = getState();

  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({name, price}),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    dispatch(addServiceSuccess());
  } catch (e) {
    dispatch(addServiceFailure(e.message));
  }

  dispatch(fetchServices());
};

export const removeService = (id) => async (dispatch) => {
  dispatch(removeServiceRequest(id));
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/${id}`, {
      method: 'DELETE',
    })
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    dispatch(removeServiceSuccess());
  } catch (e) {
    dispatch(removeServiceFailrule(e.message));
  }
  dispatch(fetchServices());
}

export const editService = () => async (dispatch, getState) => {
  dispatch(editServiceRequest())
  const {serviceEdit: {item}} = getState()
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(item),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    dispatch(editServiceSuccess());
  } catch (e) {
    dispatch(editServiceFailure(e.message));
  }
}
