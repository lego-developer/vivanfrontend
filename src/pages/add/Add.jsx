import React, { useReducer, useState } from 'react'
import "./Add.scss"
import { INITIAL_STATE, gigReducer } from '../../reducers/gigReducer'
import upload from '../../utils/Upload'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import newRequest from '../../utils/newRequest'
import { useNavigate } from 'react-router-dom'


const Add = () => {

  const [singleFile, setSingleFile] = useState(undefined)
  const [files, setFiles] = useState([])
  const [uploading, setUploading] = useState(false)

  const [state, dispatch] = useReducer(gigReducer, INITIAL_STATE)

  const handleChange = (e) => {
    dispatch({
      type: "CHANGE_INPUT",
      payload: { name: e.target.name, value: e.target.value }
    })
  }

  const handleFeature = (e) => {
    e.preventDefault()
    dispatch({
      type: "ADD_FEATURE",
      payload: e.target[0].value,
    })
    e.target[0].value = ""
  }

  const handleUpload = async (e) => {
    setUploading(true)
    try {

      const cover = await upload(singleFile)

      const images = await Promise.all(
        [...files].map(async file => {
          const url = await upload(file)
          return url
        })
      )
      setUploading(false)
      dispatch({ type: "ADD_IMAGES", payload: { cover, images } })

    } catch (error) {
      console.log(error)
    }
  }

  console.log(state)

  const navigate = useNavigate()

  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: (gig) => {
      return newRequest.post('/gigs', gig)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['myGigs'])
    }
  })


  const handleSubmit = (e) => {
    e.preventDefault()
    mutation.mutate(state)
    navigate("/mygigs")

  }

  // console.log(files) // in default it is in fileList (not in array form)
  // console.log([...files]) // convert to array


  return (
    <div className='add'>
      <div className="container">
        <h1>Add New Gig</h1>
        <div className="sections">
          <div className="left">
            <label htmlFor="">Title</label>
            <input type="text" name='title' placeholder='eg I will do ' onChange={handleChange} />
            <label htmlFor="">Category</label>
            <select name="cat" id="cats" onChange={handleChange} >
              <option value="design">Design</option>
              <option value="web">Web Development</option>
              <option value="animation">Animation</option>
            </select>

            <div className="images">
              <div className="imagesInputs">

                <label htmlFor="">Cover Image</label>
                <input type="file" onChange={e => setSingleFile(e.target.files[0])} name="" id="" />
                <label htmlFor="">Upload Images</label>
                <input type="file" onChange={e => setFiles(e.target.files)} name="" id="" multiple />

              </div>
              <button onClick={handleUpload} >{uploading ? "uploading..." : "upload"}</button>
            </div>

            <label htmlFor="">Description</label>
            <textarea name="desc" id="" cols="30" rows="10" placeholder='brief description to introduce your service to customers' onChange={handleChange} ></textarea>
            <button onClick={handleSubmit} >Create</button>
          </div>
          <div className="right">
            <label htmlFor="">Short Title</label>
            <input type="text" name="shortTitle" id="" placeholder='eg One-page web design' onChange={handleChange} />
            <label htmlFor="">Short Description</label>
            <textarea placeholder='short  description of your service' name="shortDesc" id="" onChange={handleChange} cols="30" rows="10"></textarea>
            <label htmlFor="">Delivery Time (eg 3 days)</label>
            <input type="number" name="deliveryTime" id="" min={1} onChange={handleChange} />
            <label htmlFor="">Revision Number</label>
            <input type="number" name="revisionNumber" id="" min={1} onChange={handleChange} />

            <label htmlFor="">Add Features</label>

            <form action="" className='add' onSubmit={handleFeature} >

              <input placeholder='eg page design' type="text" name="" id="" />
              <button type='submit' >add</button>

            </form>

            < div className="addedFeatures" >
              {state?.features?.map((f) => (
                <div className="item" key={f} >
                  <button onClick={() => dispatch({ type: "REMOVE_FEATURE", payload: f })} >{f}
                    <span>X</span>
                  </button>
                </div>
              ))
              }
            </div>
            <label htmlFor="">Price</label>
            <input type="number" name="price" id="" min={1} revisionNumber onChange={handleChange} />

          </div>
        </div>
      </div>
    </div >
  )
}

export default Add
