import React from 'react';
import './Message.scss'

const Message = ({ type = null, message = null }) => {
  if (!type || !message) return null;

  return (
    <div className={`message-box ` + type}>
      {type === 'error' && (<h4>Error</h4>)}
      <p>{type === 'error' && (<>An unexpected problem has occurred:<br /></>)}
      {message}
      </p>
    </div>
  )
}

export default Message