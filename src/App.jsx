import React, { useCallback, useEffect, useReducer, useState } from 'react'
import jsonData from  '../data.json'
import { DataContext, UserSection, CommentSection } from './Index.jsx'
import './App.css'

const types ={
  addComment: 'add-new-comment',
  deleteComment: 'delete-comment',
  deleteReply: 'delete-reply',
  addReply: 'add-reply',
  editComment: 'edit-comment',
  editReplyOnReplies: 'edit-reply-on-replies',
  updateScore: 'update-score'
}

function dataReducer(data, action){
  switch(action.type){
    case types.addComment:
      return { ...data, comments: [...data.comments, addNewCommentPayload( action.payload.newId, action.payload.newCom)]  }
    case types.deleteComment:
      return { ...data, comments: deleteCommentFilter(data.comments, action.payload) }
    case types.deleteReply:
      return { ...data, comments: deleteReplyFilter(data.comments, action.payload.currentId, action.payload.replyId) }
    case types.addReply:
      return { ...data, comments: addNewReply(data.comments, action.payload.currentComId, action.payload.replyContent, action.payload.curId) }
    case types.editComment:
      return { ...data, comments: editComment(data.comments, action.payload.comId, action.payload.editedCom) }
    case types.editReplyOnReplies:
      return { ...data, comments: editReply(data.comments, action.payload.replyId, action.payload.replyContent) }
    case types.updateScore:
      return { ...data, comments: updateScores(data.comments, action.payload.scoreId, action.payload.op) }
    default:
      return data
  }
}

function updateScores(comm, id, op) {
  const newCom = comm
  newCom.forEach(com=>{
    if(com.id === id) {
      op === 'plus' ? com.score = com.score + .5 : com.score = com.score - .5
    } else {
      com.replies.forEach(rep=>{
        if(rep.id === id) {
          op === 'plus' ? rep.score = rep.score + .5 : rep.score = rep.score - .5
        }
      })
    }
  })
  return newCom
}

function editReply(comm, id, content) {
  const newCom = comm
  newCom.forEach(com=>{
    com.replies.forEach(rep=>{
      if(rep.id === id){
        rep.content = content
      }
    })
  })
  return newCom
}

function editComment(comm, id, content) {
  const newCom = comm
  newCom.forEach(com=>{
    if(com.id === id) {
      com.content = content
    }
  })
  return newCom
}

function addNewReply(comm, id, content, curID) {
  const newCom = comm.map((com) => {
    if (com.id === id) {
      return {
        ...com,
        replies: [
          ...com.replies,
          {
            id: parseInt(curID),
            content: content,
            createdAt: "Just now",
            score: 0,
            replyingTo: com.user.username,
            user: {
              image: {
                png: "./images/avatars/image-amyrobson.png",
                webp: "./images/avatars/image-amyrobson.webp",
              },
              username: "silverdave",
            },
            replies: [],
          },
        ],
      };
    }
    return com;
  });
  return newCom;
}


function addNewCommentPayload(newId, newCont) {
  return { 
    id: parseInt(newId),
    content: newCont,
    createdAt: "Jus now",
    score: 0,
    user: {
      image: { 
        png: "./images/avatars/image-amyrobson.png",
        webp: "./images/avatars/image-amyrobson.webp"
      },
      username: "silverdave"
    },
    replies: []
  }
}

function deleteCommentFilter(comm, delId) {
  const newCommentsArray = comm.filter(com =>{
    return com.id !== delId;
  })
  return newCommentsArray
}

function deleteReplyFilter(comm, curId, repId) {
  const newCom = comm
  newCom.map((com)=>{
    if(com.id === curId) {
      const newReplies = com.replies.filter((rep)=>{
        return rep.id !== repId
      })
      com.replies = newReplies;
    }
  })
  return newCom
}

export default function App() {
  const [data, dataDispatch] = useReducer(dataReducer, jsonData)
  const [currentId, setCurrentId] = useState(4)

  // add comment
  const addNewComment = useCallback((newCom)=>{
    setCurrentId(prevState => prevState+1)
    dataDispatch({ type: types.addComment, payload: {newId: currentId + 1, newCom: newCom} })
  }, [currentId])

  // delete Commment
  const deleteNewComment = useCallback((deleteId)=>{
    dataDispatch({type: types.deleteComment, payload: deleteId})
  }, [])

  // delete reply comment
  const deleteNewReply = useCallback((curRepDelId, repDelId) => {
    dataDispatch({type: types.deleteReply, payload: { currentId: curRepDelId, replyId: repDelId }})
  }, [])

  // add nenw Reply on cooments
  const addNewReply = useCallback((currentComId, replied)=>{
    setCurrentId(prevState => prevState + 1)
    dataDispatch({type: types.addReply, payload: { currentComId: currentComId, replyContent: replied, curId: currentId + 1} })
  }, [currentId])

  // edit comment on comments
  const newEditedCommet = useCallback((comID, editedCom)=>{
    dataDispatch({type: types.editComment, payload: { comId: comID, editedCom: editedCom }})
  }, [])

  // edit reply on replies
  const editNewReply = useCallback ((replyId, replyContent)=>{
    dataDispatch({type: types.editReplyOnReplies, payload: { replyId: replyId, replyContent: replyContent }})
  }, [])

  // update score
  const updateNewScores = useCallback((scoreID, op)=>{
    dataDispatch({ type: types.updateScore, payload: { scoreId: scoreID, op: op } })
  }, [])

  return (
    <DataContext.Provider value={data}>
      <div className="container">
        <CommentSection 
          deleteNewComment={deleteNewComment} 
          deleteNewReply={deleteNewReply}
          addNewReply={addNewReply}
          newEditedCommet={newEditedCommet}
          editNewReply={editNewReply}
          updateNewScores={updateNewScores}
        />

        <UserSection addNewComment={addNewComment} />
      </div>
    </DataContext.Provider>
  )
}