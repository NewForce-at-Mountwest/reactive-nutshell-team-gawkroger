const remoteURL = "http://localhost:5002"

export default {
    getAllEvents: () => {
        return fetch(`${remoteURL}/events`)
            .then(ae => ae.json())
    },

    getSingleEvent: (eventId) => {
        return fetch(`${remoteURL}/events/${eventId}`)
            .then(se => se.json())
    },

    getUserEvents: (userId) => {
        return fetch(`${remoteURL}/events/?userId=${userId}`)
        .then(ua => ua.json())
    },

    postEvent: (newEvent) => {
        return fetch(`${remoteURL}/events`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newEvent)

        })
        .then(() => fetch(`${remoteURL}/events`))
        .then(e => e.json())
    },

    putEvent: (editedEvent) => {
        return fetch(`${remoteURL}/events/${editedEvent.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editedEvent)

        })
        .then(() => fetch(`${remoteURL}/events`))
        .then(e => e.json())
    },

    deleteEvent: (eventId) => {
        return fetch(`${remoteURL}/events/${eventId}`, {
            method: "DELETE",

        })
        .then(() => fetch(`${remoteURL}/events`))
        .then(e => e.json())
    }
}