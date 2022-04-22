import { useEffect, useState } from 'react';
import { Star, YellowStar } from '../shared/Icons'

export default function StarRating({rating = 5, setRating}){
    const [hover, setHover] = useState(rating)

    const handleClick = (index) => {
        setRating(index+1)
    }

    const onHover = (index) => {
        setHover(index+1)
    }

    return (
        <>
            <div className='flex'>
            {[...Array(5)].map((item, index) =><span className='cursor-pointer' key={index} onMouseLeave={() => setHover(rating)} onMouseEnter={() => setHover(index+1)} onClick={() => setRating(index+1)}>{index+1<=(hover || rating)?<YellowStar/> :<Star />}</span>)}
            </div>

        </>
    )

}