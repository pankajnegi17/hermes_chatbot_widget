import React, { Component } from 'react'
import { open_modal } from "../../store/actions/modalStatusAction";
import { connect } from "react-redux";
import userImage from '../../images/user_image.jpg'
import {  zoom_app_host,
  zoom_app_port} from '../../config'
  
import get_Picture from "../../helpers/user_profile_servies";
import { StylesProvider } from '@material-ui/styles';
import styles from './ChatBotHeader.module.css'

export class ChatBotHeader extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      
      isVideoButtonClicked:false
    }
    this.onVideoButtonClick=this.onVideoButtonClick.bind(this);
    this._onSwitchWindowButtonClick = this._onSwitchWindowButtonClick.bind(this);
  }
  

  onVideoButtonClick(){
    this.setState({isVideoButtonClicked:!this.state.isVideoButtonClicked});
    this.props.open_zoom_modal(this.state.isVideoButtonClicked, "https://" + zoom_app_host + ":" + zoom_app_port);
  }

  _onSwitchWindowButtonClick(){
    // this.props.logout_user(); 
    // this.props.open_agent_chat_with_user_date(
    //   {firstName:"Pankaj",
    //    lastName:"Negi",
    //    userType:"client",
    //    username:"pankajnegi@botaiml.com"})

       this.props.set_talk_to_what("agent")  
  }

    render() {
        return (
            <div className="chatbot-header z-depth-2"  >
            <div className="chatbot-logo-wrapper">
            {/* <img src="https://www.searchpng.com/wp-content/uploads/2018/12/Ashoka-chakra-india-transparent-png-715x699.png" className="ChatBotTopLogo" /> */}
            <img src={get_Picture(this.props.logInData.username)} className="ChatBotTopLogo" />
         
              <h6 className="ChatBOTHeading ">
              Hi! {this.props.logInData.isLogIn? this.props.logInData.firstName: "Guest"}

              {/* <span className="blinking">H</span>
              <span className="blinking2">e</span>
              <span className="blinking3">r</span>
              <span className="blinking4">m</span>
              <span className="blinking5">e</span>
              <span className="blinking6">s</span>

              <span className="blinking2-1">B</span>
              <span className="blinking2-2">O</span>
              <span className="blinking2-3">T</span> */}
               </h6>
            </div>
            <div className="chatbot-header-actions-wrapper"> 
              {/* <div
                className="TopRefreshButton"
                onClick={this.props.refeshChatbot}
                tabIndex="0"
              >
                <i className="material-icons dp48 lh-zero">autorenew</i>
              </div> */}

{/* <div
                className="TopCloseButton"
                onClick={()=>this._onShow_notificationClick()}
                tabIndex="0"
              > <i class="material-icons dp48">add_alert</i> <span>{this.state.fresh_notifications.length}</span>    
              </div> */}
 

 <div
              className="TopRefreshButton"
              id="zoom_switch_bot" 
              tabIndex="0"
              onClick={()=>window.hermesbot.onOpenZoomButtonClick()}
            >
              <i class="material-icons dp48">switch_video</i>
            </div>

            <div
              className="TopRefreshButton"
              id="modal_switch_zoom" 
              tabIndex="0"
              onClick={()=>window.hermesbot.onOpenModalButtonClick()}
            >
              <i class="material-icons dp48">tab</i>
            </div>

 

              {this.props.logInData.isLogIn && <div
              className=  "TopCloseButton" 
              onClick={() => this._onSwitchWindowButtonClick("bot")}
              tabIndex="0" 
            >
              <i class="material-icons dp48">transfer_within_a_station</i> {this.props.notifications.length > 0 && <span className={styles.dot}></span> } 
            </div>}
            </div>
          </div>  
        )
    }
}
const mapStateToProps = state => {
  return {
   logInData: state.logInStatus,
   notifications: state.notifications
  };
};

const mapDispatchToProps = dispatch => {
  return {
    open_modal: (url,count) => {
      dispatch({type:"MODAL_TYPE_ACTION", payload:"image"}); 
      dispatch({type:"MODAL_CICK_ACTION",payload:count})
      dispatch(open_modal);   
    },
    open_zoom_modal:(isOpened,zoom_url)=>{
      
      dispatch({type:"ZOOM_MODAL_URL_ACTION",payload:zoom_url});
      dispatch({type:"ZOOM_MODAL_STATUS_ACTION",payload:isOpened}); 
     
    },

    set_talk_to_what: talk_to => {
      dispatch({ type: "TALK_TO_WHAT_ACTION", payload: talk_to });
    },
    open_agent_chat_with_user_date: logInData =>{
      dispatch({type:"LOGIN_SUCCESS_ACTION",payload:logInData});
  }
  }}

 
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatBotHeader);

