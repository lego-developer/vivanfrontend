import React from 'react'
import "./MyGigs.scss"
import { Link } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest';

const MyGigs = () => {

  const currentUser = JSON.parse(localStorage.getItem("currentUser"))

  const { isLoading, error, data } = useQuery({
    queryKey: ['mygigs', currentUser._id],
    queryFn: () =>
      newRequest.get(`/gigs/mygigs/${currentUser._id}`).then((res) => res.data)
  });



  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (gigId) => {
      console.log(gigId)
      return newRequest.delete(`http://localhost:8800/api/gigs/${gigId}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['mygigs']); // Fix typo here
    }
  });

  const handleDelete = (gigId) => { // Fix parameter name here
    mutation.mutate(gigId);
  };


  return (
    <div className='myGigs'>
      <div className="container">
        <div className="title">
          <h1>Gigs</h1>
          <Link to="/add"  ><button>Add New Gig</button></Link>
        </div>
        <table>
          <thead>
            <tr>
              <th>Images</th>
              <th>Title</th>
              <th>Price</th>
              <th>Sales</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="5">Loading ...</td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="5">Something went wrong</td>
              </tr>
            ) : (
              data.map((gig) => (
                <tr key={gig._id}>
                  <td>
                    <img className="img" src={gig.cover} alt="" />
                  </td>
                  <td>{gig.title}</td>
                  <td>{gig.price}</td>
                  <td>123</td>
                  <td>
                    <img onClick={() => handleDelete(gig._id)} className='delete' src="/img/delete.png" alt="" />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

      </div>
    </div>
  )
}

export default MyGigs
