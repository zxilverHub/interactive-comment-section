import React from 'react'

function DeleteReplyConfirm({ confirm, trigger }) {

    const display = {
        scale: trigger ? '1' : '0'
    }

  return (
    <div className='delete-confirmation' style={display}>
        <h3 className='del-title'>Delete comment</h3>
        <p className='del-sub'>Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
        <div className="del-buttons">
            <button className="no" onClick={()=>confirm(false)}> NO, CANCEL</button>
            <button className="yes" onClick={()=>confirm(true)}> YES, DELETE</button>
        </div>
    </div>
  )
}

export default DeleteReplyConfirm