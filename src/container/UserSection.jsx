import React, { useState } from 'react'
import { julius, dave } from '../Index'

function UserSection({ addNewComment }) {
  const [newComment, setNewComment] = useState('')
  const addComment = (e)=>{
    if(newComment !== '') {
      e.preventDefault()
      addNewComment(newComment)
      setNewComment('')
    }
  }

  return (
    <div className='user-section'>
        <img src={ dave } alt="Avatar" className='user-avatar dave' />
        <textarea placeholder='Add a comment...' value={newComment} onChange={e => setNewComment(e.target.value)}></textarea>
        <button className='send' onClick={addComment}>SEND</button>
    </div>
  )
}

export default UserSection