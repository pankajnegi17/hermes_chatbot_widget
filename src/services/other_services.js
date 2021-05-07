import axios from "axios/index";
import {  
  chatbot_api_host 
} from "../config";

/**API for getting Workflo response */
export function get_WorkflowResponse(query, username, workflow_id, QUERY_UUID){
return new Promise((resolve, reject)=>{
    axios.post(chatbot_api_host+'/workflow',
    {MESSAGE:{QUERY_UUID:"asdadadad324242sadsad",QUERY:query, USERNAME:username, SESSION_ID:this.state.workflow_id}})
    .then(response=>{
        resolve(response)
    })
    .catch(err=>{reject(err)})  
})
}

