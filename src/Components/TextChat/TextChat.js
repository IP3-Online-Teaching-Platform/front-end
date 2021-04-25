import React, { useState } from "react";
import { auth, db } from '../Auth/Firebase-Auth';
import moment from 'moment';
import { searchTutors } from '../Auth/API'

const TextChat = () => {
    const [chatsMap, setChatsMap] = useState(undefined);
    const [messages, setMessages] = useState([]);
    const [msgcontent, setMsgContent] = useState('');
    const [loading, setLoading] = useState(true);
    const [userToMessage, setUserToMessage] = useState('');
    const [usernameToMessage, setUsernameToMessage] = useState('');
    const [sortedChats, setSortedChats] = useState([]);

    const handleSendMessage = async (event) => {
        event.preventDefault();

        if (!userToMessage) {
            return console.log('No user to message found');
        }

        let sortedUsers = [auth.currentUser.uid, userToMessage].sort()
        let sortedUsernames = []
        if (sortedUsers[0] === auth.currentUser.uid) {
            sortedUsernames.push(auth.currentUser.displayName);
            sortedUsernames.push(usernameToMessage);
        } else {
            sortedUsernames.push(usernameToMessage);
            sortedUsernames.push(auth.currentUser.displayName);
        }
        console.log(sortedUsernames, sortedUsers);

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
                usernames: sortedUsernames,
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

            chats.forEach(chat => {
                let chatdata = chat.data();
                allChats.push(chatdata);
            })

            for (let chat of allChats) {
                let authorDetails = await searchTutors([chat.users[0] === auth.currentUser.uid ? chat.users[1] : chat.users[0]]);
                chat.othername = `${authorDetails[0] ? authorDetails[0].first_name : 'Firstname PlaceHolder'} ${authorDetails[0] ? authorDetails[0].last_name : 'Surname Placeholder'}`;
            }

            let allSortedChats = allChats.sort((a, b) => {
                return a.recentMessage.timestamp - b.recentMessage.timestamp;
            })

            setSortedChats(allSortedChats);

            const chatsMap = (
                <div>
                    {allChats.map(chat => (
                        <div className="chat-contact" onClick={(event) => { getRealTimeMessages(event, chat.users[0] === auth.currentUser.uid ? chat.users[1] : chat.users[0], chat.othername) }}>
                            <div className='chat-contact-name'>{chat.othername}</div>
                            <div className='chat-contact-preview'>{chat.recentMessage.length > 25 ? chat.recentMessage.content.substring(0, 25) + "..." : chat.recentMessage.content}</div>
                        </div>
                    ))}
                </div>
            )
            setChatsMap(chatsMap);
            if (sortedChats.length >= 1) {
                let userid = undefined;
                let username = undefined;
                if (sortedChats[0].users[1] === auth.currentUser.uid) {
                    userid = sortedChats[0].users[0]
                    username = sortedChats[0].usernames[0]
                } else {
                    userid = sortedChats[0].users[1]
                    username = sortedChats[0].usernames[1]
                }
                getRealTimeMessages(undefined, userid, username);
            }
            resolve(true);
        })
    }

    const getRealTimeMessages = (event, uid, uname) => {
        if (event) {
            event.preventDefault();
        }

        let userToMessage = uid;
        setUserToMessage(userToMessage);
        let usernameToMessage = uname;
        setUsernameToMessage(uname);

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
                            <div className="chat-title-name">{usernameToMessage}</div>
                        </div>
                        <div className="main-chat" id="chat-message-container">
                            {messages.map(message => (
                                <div className={message.author === auth.currentUser.uid ? 'message-one' : 'message-two'}>
                                    <div className={message.author === auth.currentUser.uid ? 'chat-name-picture' : 'chat-name-picture2'}>
                                        <div className="chat-name">{message.author === auth.currentUser.uid ? 'You' : usernameToMessage}</div>
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
                if (messageContainer) {
                    messageContainer.scrollTop = messageContainer.scrollHeight;
                }
            });
    }

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
            <div className="chat-list-container">
                <div className="chat-list-title">
                    <div className="chat-title-name">Chats</div>
                </div>
                <div className="chat-list-main">
                    {chatsMap ? chatsMap : ''}
                </div>
            </div>
            <div className="chat-container">
                {messages ? messages : ''}
                <div className="chat-typing">
                    <textarea type="text" className="chat-input" name="msgcontent" placeholder={`Message ${usernameToMessage.split(' ')[0]}`} value={msgcontent} onChange={(event) => onChangeHandler(event)} />
                    <div className="chat-buttons-container">
                        <div className="chat-buttons">
                        </div>
                        <div className="chat-attachments">
                            <i className="fas fa-phone sidenav-list-icon" onClick={() => window.open('https://connectedtutorvideochat.herokuapp.com/')}></i>
                            <i className="fas fa-paper-plane input-send" onClick={(event) => { handleSendMessage(event) }}></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default TextChat;