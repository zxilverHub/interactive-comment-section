import React, { useState } from 'react'

function EditComment({ prevValue, setNewCommentValue }) {
  const [newComment, setNewComment] = useState(prevValue)

  const editCom = ()=>{
    if(newComment !== '') setNewCommentValue(newComment)
    setNewComment('')
  }

  return (
    <div className='user-section-edit'>
        <textarea placeholder='Add a comment...' value={newComment} onChange={e => setNewComment(e.target.value)}></textarea>
        <button className='send' onClick={editCom}>UPDATE</button>
    </div>
  )
}

export default EditComment