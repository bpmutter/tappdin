module.exports = class FetchRouter{
    
    static async get(route){
        return await fetch(route, {
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem("TAPPDIN_ACCESS_TOKEN")}`
            }
        });
    }
    static async post(route,bodyPOJO){
        await fetch(route, {
            method: "POST",
            body: JSON.stringify(bodyPOJO),
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem("TAPPDIN_ACCESS_TOKEN")}`
            }
        })
    };
    static async delete(route){
        await fetch(route, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem("TAPPDIN_ACCESS_TOKEN")}`
            }
        })
    };
    static async put(route, bodyPOJO) {
        await fetch(route, {
            method: "PUT",
            body: JSON.stringify(bodyPOJO),
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem("TAPPDIN_ACCESS_TOKEN")}`
            }
        })
    };
    static async put(route, bodyPOJO){
        await fetch(route, {
            method: "PUT",
            body: JSON.stringify(bodyPOJO),
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem("TAPPDIN_ACCESS_TOKEN")}`
            }
        })
    };
}





