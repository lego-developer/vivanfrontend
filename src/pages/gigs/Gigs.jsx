import React, { useEffect, useRef, useState } from 'react'
import "./Gigs.scss"
// import { gigs } from '../../data'
import GigCard from '../../components/gigCard/GigCard'
import { useQuery } from '@tanstack/react-query'
import newRequest from '../../utils/newRequest'
import { useLocation } from 'react-router-dom'
import { CircularProgress } from '@mui/material'


const Gigs = () => {

  const [open, setOpen] = useState(false)
  const [sort, setSort] = useState("sales")

  const minRef = useRef()
  const maxRef = useRef()

  const { search } = useLocation()
  const search1 = search.slice(1); // i removed ? from search 

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ['gigs'],
    queryFn: () =>
      newRequest.get(`/gigs?${search1}&min=${minRef.current.value}&max=${maxRef.current.value}&sort=${sort}`).then((res) => { return res.data })
  })




  const reSort = (type) => {
    setSort(type)
    setOpen(false)
  }

  useEffect(() => {
    refetch()
  }, [sort])

  const handleApply = () => {
    refetch()
  }


  return (
    <div className='gigs' >
      <div className="container">
        <span className="breadcrumbs">VIVAN  GRAPHICS & DESIGN</span>
        <h1>AI Artists</h1>
        <p>Explore the boundaries of art and technology with VIVAN AI artists</p>
        <div className="menu">
          <div className="left">
            <span>Budged</span>
            <input type="text" name="" id="" ref={minRef} placeholder='min' />
            <input type="text" name="" id="" ref={maxRef} placeholder='max' />
            <button onClick={handleApply}>Apply</button>
          </div>
          <div className="right">
            <span className="sortBy">SortBy</span>
            <span className="sortType">{sort === "sales" ? "Best Selling" : "Newest"}</span>
            < img src="./img/down.png" alt="" srcset="" onClick={() => setOpen(!open)} />
            {open && (<div className="rightMenu">
              {sort === "sales" ? <span onClick={() => reSort("createdAt")} >Newest</span> :
                <span onClick={() => reSort("sales")} >Best Selling</span>}
            </div>)}
          </div>
        </div>
        <div className="cards">
          {isLoading ? <CircularProgress style={{ marginTop: "30px" }} /> : error ? "something went wrong" : data.map(gig => (
            <GigCard key={gig._id} item={gig} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Gigs
