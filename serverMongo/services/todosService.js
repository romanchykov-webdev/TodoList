const todos=require("../models/Todo")

class TodosService{

    createTodos(todos){
        return new Promise(((resolve,reject)=>{
            try{

            }catch (e) {
                return reject({message:"todo error"})
            }
        }))
    }


}

module.exports=new TodosService()