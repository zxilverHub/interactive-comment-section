import React, { useCallback, useContext, useRef, useState } from 'react'
import { DataContext, CommentCard, ReplyCard, ReplyInput } from '../Index.jsx'

function CommentSection({ deleteNewComment, deleteNewReply, addNewReply, newEditedCommet, editNewReply, updateNewScores }) {
  const data = useContext(DataContext)

  // deleter reply
  const deleteReply = (curId, id)=>{
    deleteNewReply(curId, id)
  }

  // add reply on comments
  const [showReplyInput, seShowReplyInput] = useState(false)
  const [currentComId, setCurrentComID] = useState(null)
  const inputReplyRef = useRef();

  const addReply = useCallback((curId)=>{
    seShowReplyInput(true)
    setCurrentComID(curId)
  })

  const getReplyContent=(replied)=> {
    addNewReply(currentComId, replied);
    seShowReplyInput(false)
  }

  const updateScore = (id, op)=>{
    updateNewScores(id, op)
  }

  return (
    <div className='comment-section'>
        { data.comments.map((comment, i)=>(
          <div className="comment-card" key={i} id={comment.id}>
            <CommentCard 
              comment={comment} 
              deleteNewComment={deleteNewComment}
              addReply={addReply}
              newEditedCommet={newEditedCommet}
              updateScore={updateScore}
            />

            { showReplyInput && currentComId === comment.id &&
            <ReplyInput 
              getReplyContent={getReplyContent} 
              inputReplyRef={inputReplyRef} /> 
            }

            { comment.replies.length !== 0 && 
            <div className="reply">
              { comment.replies.map((replies, j)=>(
                  <div className="reply-card" key={j} id={replies.id}>

                      <ReplyCard 
                        replies={replies}
                        currentId={comment.id}
                        deleteReply={deleteReply}
                        editNewReply={editNewReply}
                        updateScore={updateScore}
                      />

                  </div>
              )) }
            </div> }
          </div>
        )) }
    </div>
  )
}

export default CommentSection;