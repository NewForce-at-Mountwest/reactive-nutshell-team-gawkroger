const remoteURL = "http://localhost:5002"

export default {
    getAllEmployees: () => {
        return fetch("http://localhost:5002/employees")
            .then(employees => employees.json())
    },

    getSingleEmployee: (employeeId) => {
        return fetch(`${remoteURL}/employees/${employeeId}`)
            .then(singleEmployee => singleEmployee.json())
    },

    postUser: (newUser) => {
        return fetch(`${remoteURL}/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newUser)
        }).then(u => u.json())
    }
}
