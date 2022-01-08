// import logo from './logo.svg';
import './App.css';
import React, {Component} from 'react';
//import firebase from './config/firebase.js'
import Home from './containers/home'
import AppRouter from './config/router';





class App extends Component{
  // constructor(){
  //   super();
  //   this.state = {
  //     todos: ['Ahmed', 'Hammad', 'Kashan']
  //   }
  // }
  // add_todo = () =>{
  //   this.state.todos.push(this.state.value)
  //   console.log("Data Added")
  //   firebase.database().ref('/').child("todos").push({title:this.state.value})
  //   this.setState({
  //     todos: this.state.todos
  //   })
 
  //   // this.setState({
  //   //   todos:[...this.state.todos, this.state.value]
  //   // })
  // }
  render(){
    return (
      <div >
        <AppRouter />
      </div>
      // <div>
      //   <input type="text" placeholder="Enter Text" onChange={(e) => {this.setState({value: e.target.value})}} />
      //   <button onClick = {this.add_todo}>Add Item</button>
      //   <ul>
      //   {this.state.todos.map((v, i) => {
      //     return <li key={i}>{v}</li>
      //   }

      //   )}
      //   </ul>
      // </div>
      

    )
  }
}



// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
