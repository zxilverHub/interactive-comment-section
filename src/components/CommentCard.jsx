import React, { useCallback, useEffect, useReducer, useState } from 'react'
import { plus, minus, reply, del, edit, ImageGallery, DeleteConfirmation, ReplyInput, EditComment } from '../Index';

function deleteReducer(deleletComment, action) {
    switch(action.type){
        case 'getId':
            return { ...deleletComment, deleId: action.payload, trigger: true }
        case 'confirm':
            return { ...deleletComment, op: action.payload, trigger: false }
        case 'resetDelete':
            return { ...deleletComment, op: false, trigger: false }
        default:
            return deleletComment
    }
}
 
function CommentCard({ comment, deleteNewComment, addReply, newEditedCommet, updateScore }) {
    // delete comment
    const [deleletComment, deleteCoimDispatch] = useReducer(deleteReducer, { op: false, trigger: false, deleId: null })
    useEffect(()=>{
        if(deleletComment.op) deleteNewComment(deleletComment.deleId)
        deleteCoimDispatch({type: 'resetDelete'})
    }, [deleletComment.op])
    const confirm = useCallback((deleOp)=> deleteCoimDispatch({type: 'confirm', payload: deleOp }), [])
    const deleteComment = (id)=> deleteCoimDispatch({type: 'getId', payload: id})

    // add reply on comments
    const replies = (id)=>{
        addReply(id)
    }

    // edit comment
    const [editing, setEditing] = useState(false)
    const [editID, setEditID] = useState(0)

    const setNewCommentValue = (comValue)=>{
        newEditedCommet(editID, comValue)
        setEditing(false)
    }
    // update scores
    const scores = (id, op)=>{
        updateScore(id, op)
    }

  return (
    <>
    <DeleteConfirmation confirm={confirm} trigger={deleletComment.trigger} />
    <div className="comment">
        <div className="scores-buttons">
            <button className='score-button' onClick={()=>{scores(comment.id,'plus')}}> <img src={ plus } alt="+" /> </button>
            <p className='score'>{ comment.score }</p>
            <button className='score-button' onClick={()=>{scores(comment.id, 'minus')}}> <img src={ minus } alt="-" /> </button>
        </div>

        <div className="comment-infos">
            <div className="comment-user-info">
                <div className="user-info">
                    <ImageGallery username={comment.user.username} />
                    <h2 className='username'>{ comment.user.username }</h2>
                    { comment.user.username === 'silverdave' && <p className='you'>you</p> }
                    <p className='created-at'>{ comment.createdAt }</p>
                </div>
                { comment.user.username !== 'silverdave' ?
                <button className='reply-button' onClick={()=>replies(comment.id) }>
                    <img src={ reply } alt="<-" /> Reply
                </button> :
                
                <div className="curren-user-buttons">
                    <button className='delete' onClick={()=>deleteComment(comment.id)}>
                        <img src={ del } alt="delete" />Delete
                    </button>
                    <button className='edit' onClick={()=>{ setEditing(true); setEditID(comment.id) }}>
                        <img src={ edit } alt="edit" />Edit
                    </button>
                </div>
                }
            </div>
            { !editing ?
            <p className='content'>{ comment.content }</p> :
            <EditComment 
                prevValue={comment.content}
                setNewCommentValue={setNewCommentValue} />
            }
        </div>
    </div>
    </>
  )
}

export default CommentCard;