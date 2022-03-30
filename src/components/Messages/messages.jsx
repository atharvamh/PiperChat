import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import ReactEmoji from "react-emoji";
import "./messages.sass"

const Messages = ({messages, name}) => {
    return (
        <ScrollToBottom className='scr-container'>
        {
            messages.map((message, i) => 
                <div key={i}>
                    <Message message={message} name={name}/>
                </div>
            )
        }
        </ScrollToBottom>
    )
}

const Message = ({message : {user, text, time}, name}) => {
    let isSentByCurrentUser = false;
    const trimmedName = name?.trim().toLowerCase();

    if(user === trimmedName){
        isSentByCurrentUser = true;
    }

    const isValidURL = (string) => {
        let res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_.~#?&//=]*)/g);
        return res;
    }

    return(
        isSentByCurrentUser ? 
        (
            <div className="message-container d-flex justify-content-end align-items-end">
                <p className="sent-by" style={{'marginRight' : '0.3em', 'fontSize' : '0.8em', 'fontWeight' : '500'}}>
                    <span className="text-muted text-sm" style={{'marginRight' : '0.2em', 'fontSize' : '0.75em'}}>
                        {time}
                    </span>
                    {user}
                </p>
                <div className="message-box bg-success px-2">
                    <p className="message-text text-white">
                        {
                            isValidURL(text) ? 
                            <span>
                            {text.replace(isValidURL(text)[0], '')}
                                <a 
                                    href={`${isValidURL(text) ? 
                                        isValidURL(text)[0].includes('http') ? 
                                        isValidURL(text)[0] : 'https://' + isValidURL(text)[0]
                                        : null
                                    }`}
                                    rel="noreferrer"
                                    target={"_blank"}
                                    className='text-link'
                                >
                                    {isValidURL(text)[0]}
                                </a>
                            </span>
                             : 
                            ReactEmoji.emojify(text)
                        }
                    </p>
                </div>
            </div>
        ) : 
        (
            <div className="message-container d-flex justify-content-start align-items-end">
                <div className={`message-box ${user === 'admin' ? 'bg-danger' : 'bg-secondary'} px-2`}>
                    <p className="message-text text-light">{ReactEmoji.emojify(text)}</p>
                </div>
                <p className="sent-by" style={{'marginLeft' : '0.3em', 'fontSize' : '0.8em', 'fontWeight' : '500'}}>
                    {user}
                    <span className="text-muted" style={{'marginLeft' : '0.2em', 'fontSize' : '0.75em'}}>
                        {time}
                    </span>
                </p>
            </div>
        )
    )
}

export default Messages;