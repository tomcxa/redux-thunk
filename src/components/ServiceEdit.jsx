import React, { useEffect, useState } from 'react'
import {
    useParams,
    useHistory
} from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { getService, editServiceField, editService } from '../actions/actionCreators'
import Loader from './Loader'

const ServiceEdit = () => {
    const { id } = useParams()
    const history = useHistory()
    const { item, loading, error } = useSelector(state => state.serviceEdit)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getService(id))
    }, [dispatch, id])

    const [edited, setEdited] = useState(false)

    useEffect(() => {
        if (edited && !loading && !error) {
            console.log(loading, error, edited)
            history.push('/services')
        }
    }, [loading, error, edited, history])

    function handleSubmit(e) {
        e.preventDefault()
        editService(dispatch, item)
        setEdited(true)
    }

    function handleChange(e) {
        const { name, value } = e.target
        dispatch(editServiceField(name, value))
    }

    function handleCancel() {
        history.push("/services")
    }

    if (loading) return <Loader />

    if (error) {
        return <p>Something went wrong try again</p>;
    }

    return (

        <form onSubmit={handleSubmit}>
            <input name='name' onChange={handleChange} value={item.name} />
            <input name='price' onChange={handleChange} value={item.price} />
            <input name='content' onChange={handleChange} value={item.content} />
            <button type='button' onClick={handleCancel} >
                Cancle
            </button>
            <button>Save</button>
        </form>
    )
}

export default ServiceEdit
