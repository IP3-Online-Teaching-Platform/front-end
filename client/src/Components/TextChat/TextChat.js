import React, { useState } from "react";
import { auth, db } from '../Auth/Firebase-Auth';
import moment from 'moment';

const TextChat = () => {
    const [chatsMap, setChatsMap] = useState(undefined);
    const [messages, setMessages] = useState([]);
    const [msgcontent, setMsgContent] = useState('');
    const [loading, setLoading] = useState(true);
    const [userToMessage, setUserToMessage] = useState('');
    const [conversationNames, setConvoNames] = useState([]);

    const handleSendMessage = async (event) => {
        event.preventDefault();

        if (!userToMessage) {
            return console.log('No user to message found');
        }

        let sortedUsers = [auth.currentUser.uid, userToMessage].sort()
        let docname = sortedUsers.join('|');

        const docRef = db.collection('conversations').doc(docname);
        const doc = await docRef.get();
        const docData = doc.data();

        db.collection('conversations').doc(docname).set(
            {
                recentMessage: {
                    timestamp: moment().unix() * 1000,
                    content: msgcontent,
                    author: auth.currentUser.uid
                },
                users: sortedUsers,
                created: docData.created
            }
        )

        db.collection('conversations').doc(docname).collection('messages').add(
            {
                timestamp: moment().unix() * 1000,
                content: msgcontent,
                author: auth.currentUser.uid
            }
        )

        setMsgContent('');
    }

    const getConversations = () => {
        return new Promise(async (resolve, reject) => {
            const convosRef = db.collection('conversations');
            const chats = await convosRef.where('users', 'array-contains', auth.currentUser.uid).get();

            let allChats = []
            let allConvoNames = []
            chats.forEach(chat => {
                let chatdata = chat.data();
                allChats.push(chatdata);
                allConvoNames.push(`${chatdata.users[0]}|${chatdata.users[1]}`);
            })

            const chatsMap = (
                <div>
                    {allChats.map(chat => (
                        <div className="chat-contact" onClick={() => { getRealTimeMessages(chat.users[0] === auth.currentUser.uid ? chat.users[1] : chat.users[0]) }}>
                            <div className='chat-contact-name'>{chat.users[0] === auth.currentUser.uid ? chat.users[1] : chat.users[0]}</div>
                            <div className='chat-contact-preview'>{chat.recentMessage.content.substring(0, 15) + "..."}</div>
                        </div>
                    ))}
                </div>
            )
            setChatsMap(chatsMap);
            setConvoNames(allConvoNames);
            resolve(true);
        })
    }

    const getRealTimeMessages = (uid) => {
        let userToMessage = uid
        setUserToMessage(userToMessage);
        const messageContainer = document.getElementById('chat-message-container');
        db.collection('conversations').doc([auth.currentUser.uid, userToMessage].sort().join('|')).collection('messages')
            .onSnapshot(snapshot => {
                let messages = snapshot.docs.map(doc => doc.data());
                messages.sort((a, b) => {
                    return a.timestamp - b.timestamp;
                });
                const messageDisplay = (
                    <>
                        <div className="chat-title">
                            <div className="chat-title-name">{userToMessage}</div>
                        </div>
                        <div className="main-chat" id="chat-message-container">
                            {messages.map(message => (
                                <div className={message.author === auth.currentUser.uid ? 'message-one' : 'message-two'}>
                                    <div className={message.author === auth.currentUser.uid ? 'chat-name-picture' : 'chat-name-picture2'}>
                                        <div className="chat-name">{message.author === auth.currentUser.uid ? 'You' : userToMessage}</div>
                                        <div className="chat-timestamp">{moment(message.timestamp).format('HH:mm')}</div>
                                    </div>
                                    <div className={message.author === auth.currentUser.uid ? 'message-text-container' : 'message-text-container2'}>
                                        <div className={message.author === auth.currentUser.uid ? 'message-text' : 'message-text2'}>
                                            {message.content}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )
                setMessages(messageDisplay);
                if(messageContainer){
                    messageContainer.scrollTop = messageContainer.scrollHeight;
                }
            });
    }

    // const handleLoadMessages = async (uid) => {
    //     let userToMessage = uid
    //     setUserToMessage(userToMessage);
    //     const convoRef = db.collection('conversations').doc([auth.currentUser.uid, userToMessage].sort().join('|')).collection('messages');
    //     const messagesRef = await convoRef.get();
    //     let messages = []
    //     messagesRef.forEach(message => {
    //         messages.push(message.data());
    //     })
    //     messages.sort((a, b) => {
    //         return a.timestamp - b.timestamp;
    //     });

    //     const messageDisplay = (
    //         <div className="main-chat">
    //             <div className="chat-title">
    //                 <div className="chat-title-name">{userToMessage}</div>
    //             </div>
    //             {messages.map(message => (
    //                 <div className={message.author === auth.currentUser.uid ? 'message-one' : 'message-two'}>
    //                     <div className={message.author === auth.currentUser.uid ? 'chat-name-picture' : 'chat-name-picture2'}>
    //                         <div className="chat-name">{message.author === auth.currentUser.uid ? 'You' : userToMessage}</div>
    //                         <div className="chat-timestamp">{moment(message.timestamp).format('HH:mm')}</div>
    //                     </div>
    //                     <div className={message.author === auth.currentUser.uid ? 'message-text-container' : 'message-text-container2'}>
    //                         <div className={message.author === auth.currentUser.uid ? 'message-text' : 'message-text2'}>
    //                             {message.content}
    //                         </div>
    //                     </div>
    //                 </div>
    //             ))}
    //         </div>
    //     )
    //     setMessages(messageDisplay);
    // }

    if (loading) {
        getConversations().then(success => {
            if (success) {
                setLoading(false);
            }
        });
    }

    const onChangeHandler = (event) => {
        const { name, value } = event.currentTarget;
        if (name === "msgcontent") {
            setMsgContent(value);
        }
    };

    return (
        <div className="tutors-container">
            <div className="chat-container">
                {messages ? messages : ''}
                <div className="chat-typing">
                    <input type="text" className="chat-input" name="msgcontent" value={msgcontent} onChange={(event) => onChangeHandler(event)} />
                    <div className="class-buttons-container">
                        <div className="chat-attachments">
                            <i className="fas fa-paper-plane input-send" onClick={(event) => { handleSendMessage(event) }}></i>
                        </div>
                    </div>
                </div>
            </div>
            <div className="tutors-details-container-main">

                <div className="chat-list">
                    {chatsMap ? chatsMap : ''}
                </div>
            </div>
        </div>
    )

}

export default TextChat;