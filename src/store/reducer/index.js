const INITIAL_STATE={
    entry:[
        {
        s1name:"",
        s2phone:0,
        s3id:0,
        s4address:"",
        s5amount:0,
        s6color:"",
        s7size:0,
        s8designName:"",
        s9status:""
        }
    ],
    delete:[],
    new_data_rcv:false
}

const func = (state = INITIAL_STATE, action) => {
    //console.log("Action", action)
    switch (action.type){
        case "SET_DATA":
            console.log("State: ", state)
            return ({
                ...state, 
                entry: [...state.entry, action.payload]
            })
        case "NEW_DATA_RCV":
            console.log("State: ", action.payload)
            return ({
                ...state, 
                new_data_rcv: action.payload
            })
        case "entry":
            return ({
                ...state, 
                entry: [...state.entry, action.payload]
            })
        case "UPDATE_STATE_FROM_DB":
            return ({
                ...state, 
                entry: action.payload
            })
    }
    return state;
}
export default func;