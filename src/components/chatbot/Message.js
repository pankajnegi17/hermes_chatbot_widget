import React from "react";
import {
  update_botTyping_to_true,
  update_botTyping_to_false,
} from "../../store/actions/botTypingAction";
import { connect } from "react-redux";
import { close_modal, open_modal } from "../../store/actions/modalStatusAction";
import "./Message.css";
import bot_avatar from "../../images/bot_avatar.jpg";
import user_avatar from "../../images/user_image.jpg";
import PdfViewer from "./PdfViewer";
import ImageGallery from "./ImageGallery";
import Carousel from "react-images";
import MyCarousel from "./Carousal";
import PdfCard from "./cards/PdfCard";
import get_Picture from "../../helpers/user_profile_servies";
import MenuCard from "./cards/MenuCard";
import DataCard from "./cards/DataCard";
import StatusCard from "./cards/Status_Card";
import axios from "axios/index";
import {chatbot_api_host} from '../../config'
import Parser from 'html-react-parser';
class Message extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      readMoreClicked: false,
    };
    this.setModalData = this.setModalData.bind(this);
    this.sendFeedback = this.sendFeedback.bind(this);
    this.openImageOnModal = this.openImageOnModal.bind(this);
    this.openPdfModalInModal = this.openPdfModalInModal.bind(this);
  }

  sendFeedback(props, feedback) {
    //console.log("Question: "+this.props.text+" =>"+feedback);
  }

  async openImageOnModal(file_path) {
    
   let image_data =  await axios.post(    chatbot_api_host +
        "/getImage/",
      {file_path:file_path} 
    );
    
    this.props.open_modal_for_images(image_data.data);
  }

  async openPdfModalInNewWindow(pdfData_path) {
    let response =  await axios.post(chatbot_api_host+'/getFile', {file_path:pdfData_path})
    let pdfWindow = window.open(
      "about:blank",
      "newwindow",
      "width=700,height=450"
    );
    pdfWindow.document.write(
      `<embed src="` +
      "data:application/pdf;base64," + response.data +
        `" width="100%" height="100%" 
type="application/pdf">`
    );
  }

 async  openPdfModalInModal(pdfData_path) {
    //Get pdf data 
    let response =  await axios.post(chatbot_api_host+'/getFile', {file_path:pdfData_path})
    

    this.props.open_modal_for_pdf("data:application/pdf;base64," + response.data);
  }

  setModalData(props) {
    if(this.props.isOpened){
      this.props.close_modal()
    }
    //Disabling the toggle behaviour of click here
    // this.setState({ readMoreClicked: !this.state.readMoreClicked });
    this.setState({ readMoreClicked: true});
    this.props.set_table_list_data({
      columns: props.columns,
      data: props.data,
    });
        //Disabling the toggle behaviour of click here
    // this.props.open_modal(this.state.readMoreClicked);
    this.props.open_modal(true);
  }

  openUrlToNewWindow = (url) => {
    window.open(url, "_blank", "newwindow", "width=300,height=250");
  };

  openUrlToNewTab = (url) => {
    window.open(url, "_blank");
  };

  render() {
    if(this.props.file){}
    //Preparing photos structure for gallery
    let photos = [];
    let files = [];
    if (this.props.images) {
      
      let images = this.props.images;
      let file_path = this.props.file_path;
      if (images.length == 1) {
        photos.push({ 
          file_path: file_path[0],
          img: images[0] , 
          title: "Image",
          auther: "Pankaj",
          cols: 1,
        });
      } else {
        for (let i = 0; i < images.length; i++) {
          
          photos.push({
            file_path: file_path[i],
            img: images[i],
            title: "Image",
            auther: "Pankaj",
            cols: i,
          });
        }
      }
    }

    if (this.props.files) {
      let allFiles = this.props.files;
      if (allFiles.length == 1) {
        files.push({
          file: allFiles[0],
          title: "PDF",
          auther: "Pankaj",
          cols: 1,
        });
      } else {
        for (let i = 0; i < allFiles.length; i++) {
          files.push({
            file: allFiles[i],
            title: "PDF",
            auther: "Pankaj",
            cols: i,
          });
        }
      }
    }

    return (
      <React.Fragment>
        {this.props.speaks == "bot" && (
          <div className="col s12 m8 offset-m2 offset-13 msg-outer">
            <div className="card-panel  z-depth-1 custom-card-panel ">
              <div className="row valign-wrapper margin-b-zero  ">
                <div
                  className="col s2 padding-zero avatar-style"
                  // onClick={() => props.open_modal("https://www.sms-group.com/")}
                >
                  {/* <a className="btn-floating btn-large waves-effect waves-light red">
                       {props.speaks}</a> */}

                  <img
                    className="bot-avatar-image"
                    src={get_Picture(this.props.from)}
                  />
                </div>

                {this.props.images && (
                  <div className="col s10  msg-content-wrapper message-content-wrapper-bot border-b-l-one border-zero">
                    {this.props.reply_to != undefined &&
                      this.props.reply_to != "" && (
                        <p className="pointToSomeone">@{this.props.reply_to}</p>
                      )}
                    <ImageGallery
                      galleryType="image"
                      photos={photos}
                      openImageOnModal={this.openImageOnModal}
                    ></ImageGallery>
                  </div>
                )}

                {this.props.file && (
                  <div className="col s10  msg-content-wrapper message-content-wrapper-bot border-b-l-one border-zero">
                    {this.props.reply_to != undefined &&
                      this.props.reply_to != "" && (
                        <p className="pointToSomeone">@{this.props.reply_to}</p>
                      )}
                    {/* <ImageGallery galleryType="file" file={this.props.file} openImageOnModal={this.openImageOnModal} ></ImageGallery> */}
                    <PdfCard
                      openPdfModal={this.openPdfModalInModal}
                      pdfData={this.props.file}
                      file_path = {this.props.file_path}
                    ></PdfCard>
                  </div>
                )}

                {this.props.text && !this.props.data && (
                  <div
                    className={
                      this.props.is_notification
                        ? "col s10  msg-content-wrapper   border-b-l-one  notification_item"
                        : "col s10  msg-content-wrapper message-content-wrapper-bot border-b-l-one  "
                    }
                  >
                    {this.props.reply_to != undefined &&
                      this.props.reply_to != "" && (
                        <p className="pointToSomeone">@{this.props.reply_to}</p>
                      )}
                    <span className="black-text"> {Parser(this.props.text)}</span>
                  </div>
                )}

                {this.props.text && this.props.data && (
                  <div className="col s10  msg-content-wrapper message-content-wrapper-bot border-b-l-one ">
                    {this.props.reply_to != undefined &&
                      this.props.reply_to != "" && (
                        <p className="pointToSomeone">@{this.props.reply_to}</p>
                      )}
                    <span className="black-text">{this.props.text}</span>
                    <p>
                      {"  "}
                      <a
                        // onClick={() =>// openUrlToNewTab(props.url)}
                        //  onClick={()=>openUrlToNewWindow(props.url)}
                        onClick={() => this.setModalData(this.props)}
                      >
                        Click here
                      </a>
                    </p>
                  </div>
                )}

                {this.props.menucard && (
                  <div
                    className="col s10  msg-content-wrapper message-content-wrapper-bot width-70 "
                    style={{ width: "70% !important" }}
                  >
                    <MenuCard
                      cardHeader={this.props.menucard.cardHeader}
                      buttons={this.props.menucard.menubuttons}
                    ></MenuCard>
                  </div>
                )}

                {this.props.datacard && (
                  <div
                    className="col s10  msg-content-wrapper message-content-wrapper-bot  width-70 "
                    style={
                      ({ width: "70% !important" },
                      { borderRadius: "5px !important" },
                      { borderBottomLeftRadius: "0px !important" })
                    }
                  >
                    <DataCard datacard={this.props.datacard}></DataCard>
                  </div>
                )}

                {this.props.statuscard && (
                  <div
                    className="col s10  msg-content-wrapper message-content-wrapper-bot  width-70 "
                    style={
                      ({ width: "70% !important" },
                      { borderRadius: "5px !important" },
                      { borderBottomLeftRadius: "0px !important" })
                    }
                  >
                    <StatusCard statuscard={this.props.statuscard}></StatusCard>
                  </div>
                )}
              </div>
            </div>

            {!this.props.is_notification == true &&
              this.props.talk_to_what == "bot" && (
                <div className="row margin-b-zero  reaction-button-wrapper ">
                  <div className="col s10 padding-zero ">
                    <div
                      class="icon-preview col s2 m3"
                      onClick={() => this.sendFeedback(this.props, "like")}
                    >
                      <i class="material-icons dp48 thumbs-up">thumb_up</i>{" "}
                    </div>
                    <div
                      class="icon-preview col s2 m3"
                      onClick={() => this.sendFeedback(this.props, "dislike")}
                    >
                      <i class="material-icons dp48 thumbs-down">thumb_down</i>{" "}
                    </div>
                  </div>
                </div>
              )}
          </div>
        )}

        {this.props.speaks == "me" && (
          <div className="col s12 m8 offset-m2 offset-13 msg-outer">
            <div className="card-panel   z-depth-1 custom-card-panel ">
              <div className="row valign-wrapper margin-b-zero ">
                {this.props.images && (
                  <div className="col s10 right-align   msg-content-wrapper message-content-wrapper-user border-zero ">
                    <ImageGallery
                      galleryType="image"
                      photos={photos}
                      openImageOnModal={this.openImageOnModal}
                    ></ImageGallery>
                  </div>
                )}

                {this.props.file && (
                  <div className="col s10 right-align    msg-content-wrapper message-content-wrapper-user border-zero">
                   
                    {/* <ImageGallery galleryType="file" file={this.props.file} openImageOnModal={this.openImageOnModal} ></ImageGallery> */}
                    <PdfCard
                      openPdfModal={this.openPdfModalInNewWindow}
                      pdfData={this.props.file}
                      file_path = {this.props.file_path}
 
                    ></PdfCard>
                  </div>
                )}

                {/* {      
                  this.props.files &&
                  <div className="col s10 right-align indigo lighten-5  msg-content-wrapper message-content-wrapper-user border-zero">
                 { this.props.files.map(file=>{ 
                    let pdfData = file.replace("data:application/pdf;base64,","")
  
                   return <PdfViewer base64data={pdfData}></PdfViewer>
                  })}
                  </div>
                } */}

                {this.props.text && (
                  <div className="col s10 right-align    msg-content-wrapper message-content-wrapper-user border-b-r-one ">
                    <span className="black-text">{this.props.text}</span>
                  </div>
                )}

                {this.props.data && (
                  <div className="col s10 right-align   msg-content-wrapper message-content-wrapper-user border-b-r-one ">
                    <p>
                      {" "}
                      <a
                        // onClick={() =>// openUrlToNewTab(props.url)}
                        //  onClick={()=>openUrlToNewWindow(props.url)}
                        onClick={() => this.setModalData(this.props)}
                      >
                        Click here
                      </a>
                    </p>
                  </div>
                )}

                <div className="col s2 padding-zero avatar-style">
                  {/* <a className="btn-floating btn-large waves-effect waves-light deep-purple accent-4">
                      {props.speaks}</a> */}
                  <img
                    className="bot-avatar-image"
                    src={get_Picture(this.props.logInData.username)}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isTyping: state.isTyping.isTyping,
    isOpened: state.modalStatus.isOpened,
    modalUrl: state.modalStatus.modal_url,
    logInData: state.logInStatus,
    talk_to_what: state.talk_to_what.name,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    close_modal: () => {
      dispatch(close_modal);
    },
    open_modal: (readMoreClicked, url) => {
      dispatch({ type: "MODAL_TYPE_ACTION", payload: "dataList" });
      dispatch({ type: "MODAL_URL_ACTION", payload: url });
      dispatch({ type: "MODAL_STATUS_ACTION", payload: readMoreClicked });
    },
    open_modal_for_images: (images) => {
      dispatch({ type: "MODAL_IMAGE_DATA_ACTION", payload: images });
      dispatch({ type: "MODAL_TYPE_ACTION", payload: "image" });
      dispatch({ type: "MODAL_STATUS_ACTION", payload: true });
    },
    open_modal_for_pdf: (pdf) => {
      dispatch({ type: "MODAL_IMAGE_DATA_ACTION", payload: pdf });
      dispatch({ type: "MODAL_TYPE_ACTION", payload: "pdf" });
      dispatch({ type: "MODAL_STATUS_ACTION", payload: true });
    },
    update_botTyping_to_true: () => {
      dispatch(update_botTyping_to_true);
    },
    update_botTyping_to_false: () => {
      dispatch(update_botTyping_to_false);
    },
    set_table_list_data: (tableData) => {
      dispatch({ type: "TABLE_DATA_ACTION", payload: tableData });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Message);
