import React, { Component, lazy } from "react";
import { connect } from "react-redux";
//import Chatbot from './chatbot/Chatbot';
import MinimizedChatbot from "../components/chatbot/MinimizedChatbot";
import ModalOne from "./modals/ModalOne";
import ZoomMeetingModal from "./modals/ZoomMeetingModal";
import uuid from "react-uuid";
import "./App.css";
import MaximizedChatbot from "./chatbot/MaximizedChatbot";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { store as nonistore } from "react-notifications-component";
import { createPortal } from "react-dom";
import { close_modal, open_modal } from "../store/actions/modalStatusAction";
import {initializeHandlers} from '../services/socketServices'
import socketIOClient from "socket.io-client"; 
import {chatbot_api_host} from '../config'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      open: true,
    };
    this.on_userSelect = this.on_userSelect.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.createSocket  = this.createSocket.bind(this);
  }

  create_Notification(data) {
    nonistore.addNotification(data);
  }

  handleClose() {
    this.setState({ open: false });
  }


  componentWillMount(){ 
    if(sessionStorage.getItem("username"))
      {this.props.set_User_Data_After_Login({
      firstName: sessionStorage.getItem("fname"),
      lastName:sessionStorage.getItem("lname"),
      userType: sessionStorage.getItem("user_type"),
      username: sessionStorage.getItem("username")
    });  
    //Create a new socket for existing user
    this.createSocket(sessionStorage.getItem("username"))
  }  
    //    this.props.set_session_details(sessionID);
  }

  createSocket(username){
     //Establishing WebSocket
     const socket = socketIOClient.connect(chatbot_api_host, {secure: true}); 
              
     socket.on('handshake', (data)=>{
       console.warn(`SOCKET Established!!!!!!!!!!! with socketId: ${data.socketId}`) 
       sessionStorage.setItem("active_Socket_id_zoom", data.socketId)
       socket.emit('createSelfRoom', {socketId:data.socketId, username:username})
     })

     socket.on('selfRoomCreated', (data)=>{
       //Join all rooms NOTE: here socket i reffer to actual socket id
       socket.emit('joinRooms', {username:username, socketId:data.socketId})
     })

     socket.on('joinRooms_ok', (data)=>{
       console.warn('USER HAS JOINED ALL ROOMS...!!')
     })

     socket.on('joinRoom_ok',data=>{
       console.warn('User has joined a new Room');
     })
     
     initializeHandlers(socket, username)
  }
 

  componentDidMount() { 
    //Creating session details
  }

  on_userSelect(user) {
    this.props.open_agent_chat_with_user_date(user);
    this.props.close_modal();
    this.setState({ loggedIn: true });
  }

  render() { 
    return (
      <React.Fragment>
        <MaximizedChatbot
          create_Notification={this.create_Notification}
        ></MaximizedChatbot> 
        {this.props.isOpened && <ModalOne />}
        <ZoomMeetingModal />
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    open_agent_chat_with_user_date: (logInData) => {
      dispatch({ type: "LOGIN_SUCCESS_ACTION", payload: logInData });
    },
    set_session_details: (sessionDetails) => {
      dispatch({ type: "SESSION_DETAIL_ACTION", payload: sessionDetails });
    },
    close_modal: () => {
      dispatch(close_modal);
    },
    set_User_Data_After_Login: (logInData) => {
      dispatch({ type: "LOGIN_SUCCESS_ACTION", payload: logInData });
    }
  };
};

const mapStateToProps = (state) => {
  return {
    isOpened: state.modalStatus.isOpened,
    logInStatus: state.logInStatus,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
