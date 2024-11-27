const SERVER_URL = "http://127.0.0.1:8080/graphql";


export const loginFn = async (email,password) => {
    const response = await fetch ("http://127.0.0.1:8080/login" , {
        method: "POST",
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            email : email,
            password : password
        })
    });

    return await response.json();
}

export const signUp = async (name,email,password) => {
    const response = await fetch ("http://127.0.0.1:8080/signup" , {
        method: "POST",
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            name: name,
            email: email,
            password: password
        })
    });

    return await response.json();
}

export const getUserInfo =async () => {
    const response = await fetch (SERVER_URL , {
        method:"POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem("token"),
        },
        body: JSON.stringify({
            query: `query GetUserInfo {
                getUserInfo {
                    name
                    email
                }
            }`
        })
    });
    return await response.json();
}

export const getTitleList = async () => {
    const response = await fetch (SERVER_URL , {
        method:"POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem("token"),
        },
        body: JSON.stringify({
            query: `query GetTitleList {
                getTitleList {
                    title
                    url
                }
            }`
        })
    });
    return await response.json();
}

export const insertData = async (data,title) => {
    const response = await fetch (SERVER_URL , {
        method:"POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem("token"),
        },
        body: JSON.stringify({
            query: `mutation InsertData {
                insertData(data: """${data}""", title: "${title}") {
                 url
                }
            }`
        })
    });
    return await response.json();
}


export const getContentTitle = async (token) => {
    const response = await fetch (SERVER_URL , {
        method:"POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem("token"),
        },
        body: JSON.stringify({
            query: `query GetTitleData {
                getTitleData(urlToken: "${token}") {
                    title
                    data
                    editAction
                }
            }`
        })
    });
    return await response.json();
}
