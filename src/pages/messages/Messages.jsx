import React from 'react'
import "./Messages.scss"
import { Link } from 'react-router-dom'
import {  useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import newRequest from '../../utils/newRequest'
import moment from "moment"

const Messages = () => {

  const queryClient = useQueryClient()

  const currentUser = JSON.parse(localStorage.getItem("currentUser"))

  // const message = "lorem ipsum is one of the most important and most beautiful thing s in the real world"

  const { isLoading, error, data } = useQuery({
    queryKey: ['conversations'],
    queryFn: () =>
      newRequest.get(`/conversations`).then((res) => { return res.data })
  })

  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.put(`/conversations/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['conversations']) // this equal to queryKey 
    }
  })

  const handleRead = (id) => {
    mutation.mutate(id)
  }

  return (
    <div className='messages'>
      {isLoading ? "Loading..." : error ? "something went wrong" : (<div className="container">
        <div className="title">
          <h1>Messages</h1>

        </div>
        <table>
          <thead>
            <tr>
              <th>{currentUser.isSeller ? "Buyer" : "Company"}</th>
              <th>Last Message</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((c) => (
              // <Link to="/message/123" className='link'>

                <tr className={((currentUser.isSeller && !c.readBySeller) || (!currentUser.isSeller && !c.readByBuyer)) && "active"} key={c.id}>
                  <td>{currentUser.isSeller ? c.buyerId : c.sellerId}</td>
                  <td><Link to={`/message/${c.id}`} className='link'>{c?.lastMessage?.substring(0, 100)}...</Link></td>
                  <td>{moment(c.updatedAt).fromNow()}</td>
                  {((currentUser.isSeller && !c.readBySeller) || (!currentUser.isSeller && !c.readByBuyer))
                    &&
                    <td>
                      <button onClick={() => handleRead(c.id)} >Mark as Read</button>
                    </td>
                  }
                </tr>
              // </Link>
            ))}
          </tbody>
        </table>

      </div>)}
    </div>
  )
}

export default Messages
