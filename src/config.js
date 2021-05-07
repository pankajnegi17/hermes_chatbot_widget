require('dotenv').config()

export const nlp_gateway_host ='hermesbetahr.workflo.ai'
export const nlp_gateway_port = 19002

export const nlp_gateway_url = sessionStorage.getItem("nlp_gateway_url")

export const domain = sessionStorage.getItem("domain") ? sessionStorage.getItem("domain") :'hr_pro'

export const instance_type = sessionStorage.getItem("instance_type")? sessionStorage.getItem("instance_type") : "frontend" 

// export const chatbot_api_host = 'https://localhost:5010'
export const chatbot_api_host = 'https://hermesmultimsgbeta.workflo.ai:5015' 

// export const vefification_api = 'https://localhost:5010/varifyUser'
export const vefification_api = 'https://hermesmultimsgbeta.workflo.ai:5015/varifyUser'

// export const zoom_app_host = 'localhost'
export const zoom_app_host = 'hermesbetahr.workflo.ai'
export const zoom_app_port = 8085

// export const push_server_host = 'https://localhost:5005'
export const push_server_host = 'https://pushbeta.workflo.ai:5005'

export const form_builder_host = 'https://hermesvt.workflo.ai:8085/index/index/admin'
export const video_url  = "https://hermesvt.workflo.ai:8085/uploadexcel/uploadexcel" 

export const form_builder_url_user= "https://hermesvt.workflo.ai:8085/index/index/user"
export const form_builder_url_admin= "https://hermesvt.workflo.ai:8085/index/index/admin"
export const video_transcript_url= ""
export const excel_export_url= "https://formbuilderbeta.workflo.ai:8085/uploadexcel/uploadexcel"
