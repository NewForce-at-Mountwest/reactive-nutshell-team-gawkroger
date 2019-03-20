const remoteURL = "http://localhost:5002"

export default {
    getAllMessages: () => {
        return fetch(`${remoteURL}/messages?_expand=user`)
        .then(messages => messages.json()
        );
    },
    postMessage (newMessage) {
        return fetch(`${remoteURL}/messages`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newMessage)
        }).then(data => data.json())
    },
    getOneMessage: id =>
    fetch(`${remoteURL}/messages/${id}`).then(message => message.json()),
    put(editedMessage) {
        return fetch(`${remoteURL}/messages/${editedMessage.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify(editedMessage)
        }).then(data=>data.json());
    }
};