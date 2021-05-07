import axios from "axios/index";
import { 
    nlp_gateway_host,
    nlp_gateway_port,
    nlp_gateway_url
  } from "../config";

  export async function get_nlp_response_one_old(req_body){
      return new Promise((resolve, reject)=>{
          try{
             axios.post("https://"+nlp_gateway_host+":"+nlp_gateway_port+"/conversion/request/v0", 
           req_body, {withCredentials: false},
            {
              headers: { "Content-Type": "application/x-www-form-urlencoded" },
            }
          ).then(res=>{
            resolve(res)
          }).catch(err=>{reject("ERROR in NLP_REQUEST_ONE",err)})
          
          }
          catch(err){
            reject("Exception in NLP_REQUEST_ONE", err)
          } 
      })
  }

  export function get_nlp_response(reqBody){
  return new Promise((resolve, reject)=>{
   axios.post(sessionStorage.getItem("nlp_gateway_url"), reqBody, {headers: { "Content-Type": "application/x-www-form-urlencoded"}})
  .then(function (response) {
    

    let dummy_response = {data:{
      MESSAGE:{
        'RESULT':[{'BODY': "<p>Hi I can do following things</p> <ul><li>NLP</li><li>HR</li></ul><p>Thanks!</p>",
        'BODYTYPE': "STRING",
        'DATA-TYPE': "TAB-CASUAL-TALK",
        'HEADER': "",
        'IFRAME': ""}]
      }
    },
    status: 200} 
    
    
    return resolve(response)})
  .catch(function (error) {reject(error)});
  })
  }
 


  export async function get_nlp_response_two(req_body){
    
    return new Promise((resolve, reject)=>{
        try{
          axios
         .post(
           "https://" +
             nlp_gateway_host +
             ":" +
             nlp_gateway_port +
             "/conversion/response/v0",
             req_body,{withCredentials: false},
           {
             headers: { "Content-Type": "application/x-www-form-urlencoded" },
           }      
         ).then(res=>{
             resolve(res)
         }).catch(err=>{
             reject("Exception in NLP_REQUEST_TWO")
         })
        
        }
        catch(err){
          reject("ERROR in NLP_REQUEST_TWO")
        } 
    })
}


