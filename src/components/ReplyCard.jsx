import React, { useCallback, useEffect, useReducer, useState } from 'react'
import { plus, minus, del, edit, reply, ImageGallery, DeleteReplyConfirm, EditReply } from '../Index'

function delRepReducer(deletReply, action) {
    switch(action.type) {
        case 'getRepId':
            return { ...deletReply, delRepId: action.payload, trigger: true }
        case 'confirm':
            return { ...deletReply, op: action.payload, trigger: false }
        case 'reset':
            return { ...deletReply, op: false, trigger: false }
    }
}

function ReplyCard({ replies, currentId, deleteReply, editNewReply, updateScore }) {
    const [deletReply, deleteReplyDispatch] = useReducer(delRepReducer, { op: false, delRepId: null, trigger: false })

    useEffect(()=>{
        if(deletReply.op) deleteReply(currentId, deletReply.delRepId)
        deleteReplyDispatch({type: 'reset'})
    }, [deletReply.op])

    const getDeleteReplyId = (id)=> deleteReplyDispatch({type: 'getRepId', payload: id })
    const confirm = useCallback((op)=> deleteReplyDispatch({type: 'confirm', payload: op}), [])

    // edit reply
    const [editing, setEditing] = useState(false)
    const [editID, setEditID]= useState(null)

    const getReplyContent =(content)=>{
        editNewReply(editID, content)
        setEditing(false)
    }
    // update scores
    const scores = (id, op) => updateScore(id, op)


  return (
    <>
        <DeleteReplyConfirm confirm={confirm} trigger={deletReply.trigger} />
        <div className="scores-buttons">
            <button className='score-button' onClick={()=>{ scores(replies.id, 'plus') }}> <img src={ plus } alt="+" /> </button>
            <p className='score'>{ replies.score }</p>
            <button className='score-button' onClick={()=>{ scores(replies.id, 'minus') }}> <img src={ minus } alt="+" /> </button>
        </div>

        <div className="comment-infos">
            <div className="comment-user-info">
                <div className="user-info">
                    <ImageGallery username={replies.user.username} />
                    <h2 className='username'>{ replies.user.username }</h2>
                    { replies.user.username === 'silverdave' && <p className='you'>you</p> }
                    <p className='created-at'>{ replies.createdAt }</p>
                </div>
                { replies.user.username !== 'silverdave' ?
                <button className='reply-button'>
                    <img src={ reply } alt="<-" /> Reply
                </button> :

                <div className="curren-user-buttons">
                    <button className='delete' onClick={()=>getDeleteReplyId(replies.id)} >
                        <img src={ del } alt="delete" />Delete
                    </button>
                    <button className='edit' onClick={()=>{ setEditing(true); setEditID(replies.id) }}>
                        <img src={ edit } alt="delete" />Edit
                    </button>
                </div>
                }
            </div>
            { !editing ? 
            <p className='content'> <span className='replying-to'>@{ replies.replyingTo }</span> { replies.content }</p> :
            <EditReply getReplyContent={getReplyContent} prevCom={replies.content} />
            }
        </div>
    </>
  )
}

export default ReplyCard