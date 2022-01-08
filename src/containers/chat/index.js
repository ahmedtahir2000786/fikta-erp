import React, {Component} from 'react';
import {connect} from 'react-redux'

class Chat extends Component{
    render(){
        return(
            <div>
                <h2>Welcome to Chat!</h2>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    users: state.users
})

const mapDispatchToProps = (dispatch) => ({
//     set_data: () => dispatch(set_data()),
//    facebook_login: () =>dispatch(facebook_login())
})


export default connect(mapStateToProps,mapDispatchToProps)(Chat);