const remoteURL = "http://localhost:5002"

export default {
    getAll: () => {
        const actvUserId = sessionStorage.getItem("userId");
        return fetch(`${remoteURL}/news?userId=${actvUserId}`)
        .then(news => news.json())
        .then((parsedNews => {
            const sortedNews = parsedNews.sort(function(a,b) {
                return b.timestamp-a.timestamp
            })
            console.log(sortedNews);
            return sortedNews
        }))
    },

    getOne: id => {
       return fetch(`${remoteURL}/news/${id}`)
        .then(news => news.json());
    },

    addNews: newNews => {
        return fetch(`${remoteURL}/news`, {
         method: "POST",
         headers: {
                "Content-Type": "application/json"
         },
         body: JSON.stringify(newNews)
    }).then(data => data.json());
    },
    updateNews: editedNews => {
        return fetch(`${remoteURL}/news/${editedNews.id}`, {
         method: "PUT",
         headers: {
             "Content-Type": "application/json"
         },
         body: JSON.stringify(editedNews)
        }).then(data => data.json())
    },



    deleteNews: id => {
        return fetch(`${remoteURL}/news/${id}`, {
            method: "DELETE"
        })
        .then(() => fetch(`${remoteURL}/news`))
        .then(e => e.json())
    }

};