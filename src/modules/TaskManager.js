const remoteURL = "http://localhost:5002";

export default {

    get(id) {
        return fetch(`${remoteURL}/tasks/${id}`).then(e => e.json());
    },

    getOne: (taskId) => fetch(`${remoteURL}/tasks/${taskId}`).then(e => e.json()),

    getUserTasks: (userId) => {
        return fetch(`${remoteURL}/tasks/?userId=${userId}`)
        .then(access => access.json())
    },

    put(editedTask) {
        return fetch(`${remoteURL}/tasks/${editedTask.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editedTask)
        }).then(data => data.json());
    },

    getAll() {
        return fetch(`${remoteURL}/tasks`).then(e => e.json());
    },

    post(newTask) {
        return fetch(`${remoteURL}/tasks`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newTask)
        })
        .then(() => fetch(`${remoteURL}/tasks/?userId=${sessionStorage.getItem("userId")}`))
        .then(access => access.json())
    },
}