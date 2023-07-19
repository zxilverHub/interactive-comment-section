import React, { useState } from 'react'

function EditReply({ getReplyContent, prevCom }) {
  const [newComment, setNewComment] = useState(prevCom)

  const updateReply =()=>{
    if(newComment !== '') getReplyContent(newComment)
    setNewComment('')
  }

  return (
    <div className='user-section-edit'>
        <textarea placeholder='Add a comment...' value={newComment} onChange={e => setNewComment(e.target.value)}></textarea>
        <button className='send' onClick={updateReply} >UPDATE</button>
    </div>
  )
}

export default EditReply