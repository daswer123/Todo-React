import * as firebase from "firebase"
import "firebase/database";

var firebaseConfig = {
  apiKey: "AIzaSyDCgKn5drHD0kL6RawTiY3LNVw6tEQUJLo",
  authDomain: "todoapp-d8181.firebaseapp.com",
  databaseURL: "https://todoapp-d8181.firebaseio.com",
  projectId: "todoapp-d8181",
  storageBucket: "todoapp-d8181.appspot.com",
  messagingSenderId: "524163508174",
  appId: "1:524163508174:web:f07302269e5fa97189ad9f",
  measurementId: "G-F9V08JQVGX"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.database()

class TodoInfo{

     database = firebase.database();
    _api_base = "http://localhost:3001";



    getAllData = async (url) => {
        // let returnData = [];
        // const returnPromice = await new Promise((resolve,rejected) => {

        //    this.database.ref(url).on("value", (snapshot) =>{
        //         const value =  snapshot.val();
        //         for (let key in value){
        //            returnData.push(value[key])
        //         }
        //    })
        //    if (returnData === []){
        //        return rejected("Error")
        //    }


        //    resolve(returnData)

        // })
        // return returnPromice

       const result = await this.database.ref(url).once("value", (snapshot) => {
            return snapshot
        })

        if (result.val() == null){
            return []
        }
        return result.val()
        // const request = await fetch(this._api_base+url);
        
        // if (!request.ok){
        //     throw new Error(`Couldn't fetch ${request.url} because ${request.statusText}`)
        // }

        // return await request.json();
    }

    getAllPosts = async () => {
        return await this.getAllData("/tasks");
    }

    getAllCategories = async () => {
        return await this.getAllData("/categories")
    }

    addNewItem = async (url,data) => {
        const id =JSON.parse(data).id
        data = JSON.parse(data)
        this.database.ref(`${url}/${id}`).set({
            ...data
        })



        // const request = await fetch(`${this._api_base}${url}`,{
        //     method : "POST",
        //     headers : {
        //         "Content-Type" : "application/json"
        //     },
        //     body : data
        // })

        // if (!request.ok) {
        //     throw new Error("couldn't fetch"+url+" because" + request.status);
        // }

        // return request.json()
    }

    addNewTask =  async (data) => {
        return await this.addNewItem("/tasks",data)
    }

    addNewCategory =  async (data) => {
        return await this.addNewItem("/categories",data)
    }

    deleteOneItem = async (url,id) => {
        

        // fetch(`${this._api_base}${url}/${id}`,{
        //     method : "DELETE",
        //     headers: {
        //         "Content-type" : "application/json"
        //     }
        // });

        this.database.ref(url+"/"+id).remove()
        // if (!request.ok){
        //     throw new Error(`Couldn't fetch ${request.url} because ${request.statusText}`)
        // }

        console.log("Item-Deled")
    }

    deleteTask = async (id) => {
        return await this.deleteOneItem(`/tasks`,id);
    }

    deleteCategory = async (id) => {
        return await this.deleteOneItem(`/categories`,id);
    }

    changeItems = async (url,id,data) => {
        
        // const request = await fetch(this._api_base+url+id,{
        //     method : "PUT",
        //     headers: {'Content-Type': 'application/json'},
        //     body : data
        // })
        // return await request.json()
    }

    changeCategoryName = async (id,data) => {
        const name = JSON.parse(data).name
        console.log(name)

        this.database.ref("/categories/"+id).update({
            name : name
        })
    }

    toggleTask = async (id,data) => {
        const complited = await JSON.parse(data).complited
        this.database.ref("/tasks/"+id).update({
            complited : complited
        })
    }
}

const createUnicId = (items) => {
    let id = 0;

    items.forEach(item => {
        while(id <= item.id){
            // id += Math.floor(Math.random()*5+1)
            id++
        }
        })
        return id
    }


    

export default TodoInfo
export {
    createUnicId,
}




