import React from 'react'
import "./Orders.scss"
// import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import newRequest from '../../utils/newRequest'
import { useNavigate } from 'react-router-dom'

const Orders = () => {

  const currentUser = JSON.parse(localStorage.getItem("currentUser"))
  const navigate = useNavigate()

  const { isLoading, error, data } = useQuery({
    queryKey: ['orders'],
    queryFn: () =>
      newRequest.get(`/orders`).then((res) => { return res.data })
  })

  // console.log(data)
  // console.log(currentUser)



  // let userId = [];
  // if (currentUser.isSeller) {
  //   userId.push(data?.buyerId);
  // } else {
  //   userId.push(data?.sellerId);
  // }

  // console.log(userId)


  // const { isLoading: isLoadingUser, error: errorUser, data: dataUser } = useQuery({
  //   queryKey: ['user', userId],
  //   queryFn: () =>
  //     newRequest.get(`/users/${userId}`).then((res) => { return res.data }),
  //     enabled:!!userId, // useQuery works only when data is present in line 21
  // })
  // console.log(dataUser)

  // currentUser.isSeller ? {user:data.buyerId} : {user:data.sellerId}


  const handleContact = async (order) => {

    const sellerId = order.sellerId
    const buyerId = order.buyerId
    const id = sellerId + buyerId

    try {
      const res = await newRequest.get(`/conversations/single/${id}`)
      navigate(`/message/${res.data.id}`)
    } catch (error) {
      if (error.response.status === 404) {
        const res = await newRequest.post(`/conversations`, {
          to: currentUser.isSeller ? buyerId : sellerId,
        })
        navigate(`/message/${res.data.id}`)
      }
    }


  }


  return (
    <div className='orders'>
      {isLoading ? "Loading ..." : error ? "Something went wrong" : (<div className="container">
        <div className="title">
          <h1>Orders</h1>
        </div>
        <table>
          <thead>
            <tr>
              <th>Images</th>
              <th>Title</th>
              <th>Price</th>
              <th>{currentUser?.isSeller ? "Buyer" : "Company"}</th>
              <th>Contact</th>
            </tr>
          </thead>
          <tbody>
            {data.map((order) => (
              <tr key={order._id}>
                <td><img className='img' src="https://t3.ftcdn.net/jpg/02/14/53/92/360_F_214539232_YnUrtuwUEt84gHuU0qG8l7OwZvH4rnPG.jpg" alt="" /></td>
                <td>{order.title}</td>
                <td>{order.price}</td>
                <td>123</td>
                <td>
                  <img className='message' src="/img/message.png" alt="" onClick={() => handleContact(order)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>)}
    </div>
  )
}

export default Orders



