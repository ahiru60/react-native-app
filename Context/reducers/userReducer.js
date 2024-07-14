const initialState ={
    email:'',
    name:''

}

const userReducer = (state = initialState,action)=>{
    switch(action.type){
        case "ADD_USER":
            return{
                ...state,
                email: action.email,
                name: action.name
            }
    }
}