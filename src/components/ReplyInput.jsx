import React, { useEffect, useState } from 'react'
import { dave } from '../Index'

function ReplyInput({ getReplyContent, inputReplyRef }) {
    const [newReply, setNewReply] = useState('')

    useEffect(()=>{
        inputReplyRef.current.focus()
    }, [])

    const addReply =()=>{
        if(newReply !== '')getReplyContent(newReply)
        setNewReply('')
    }

    return (
        <div className='user-section'>
            <img src={ dave } alt="Avatar" className='user-avatar dave' />
            <textarea ref={inputReplyRef} placeholder='Add a comment...' value={newReply} onChange={e => setNewReply(e.target.value)}></textarea>
            <button className='send' onClick={addReply}>REPLY</button>
        </div>
    )
  
}

export default ReplyInput