const boy = document.querySelector('#boy-selector')
const girl = document.querySelector('#girl-selector')
const chatHeader = document.querySelector('.chat-header')
const cMsg = document.querySelector(".chat-messages")
const inputForm = document.querySelector('.input-form')
const chatInput = document.querySelector('.input-chat')
const clearButton =document.querySelector('.clear-button')


const chatElement = (message)=>`
    <div class="message ${message.sender === 'User-A' ? 'black-bg' : 'light-bg'}">
    <div class="message-sender">${message.sender}</div>
    <div class="message-text">${message.text}</div>
    <div class="message-timestamp">${message.timestamp}</div>
</div>
`
;


let messageSender = 'User-A';


const updateSender = (name)=>{
    messageSender = name
    chatHeader.innerText =`${messageSender} messaging....`
    chatInput.placeholder =`Type here, ${messageSender}`
    if(name === 'User-A'){
        boy.classList.add('active-person')
        girl.classList.remove('active-person')
    }
    if(name === 'User-B'){
        girl.classList.add('active-person')
        boy.classList.remove('active-person')
    }
    chatInput.focus()

};

boy.onclick = ()=> updateSender('User-A')
girl.onclick = ()=> updateSender('User-B')



const clearChat =()=>{
    localStorage.removeItem('messages');
    cMsg.innerHTML = '';
   
};
clearButton.addEventListener('click', clearChat);



const messageSend =(event) => {
    event.preventDefault();
const timestamp = new Date().toLocaleString('en-us', {hour:'numeric',minute: 'numeric', hour12:true});
const message={
    sender: messageSender,
text:chatInput.value,
timestamp,
};
let messages = JSON.parse(localStorage.getItem('messages')) || [];
messages.push(message);

localStorage.setItem('messages',JSON.stringify(messages));
renderMessages(messages);
inputForm.reset();

cMsg.scrollTop = cMsg.scrollHeight
};

const renderMessages = (messages) => {
    cMsg.innerHTML = messages.map(chatElement).join('');
};

inputForm.addEventListener('submit',messageSend)

document.addEventListener('DOMContentLoaded', () => {
    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    renderMessages(messages);
})