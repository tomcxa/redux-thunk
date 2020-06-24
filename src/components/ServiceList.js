import React, { useEffect } from 'react'
import {
  Link,
} from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux';
import { removeService, fetchServices } from '../actions/actionCreators';
import Loader from './Loader'

function ServiceList(props) {
  const {items, loading, error} = useSelector(state => state.serviceList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchServices())
  }, [dispatch])

  const handleRemove = id => {
    dispatch(removeService(id));
  }

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p>Something went wrong try again</p>;
  }

  return (
    <ul>
      {items.map(o => (
        <li key={o.id}>
          {o.name} {o.price}
          <button onClick={() => handleRemove(o.id)}>Delete</button>
          <button >
            <Link to={`/services/${o.id}`}>Edit</Link>
          </button>
        </li>
      ))}
    </ul>
  );
}

export default ServiceList
