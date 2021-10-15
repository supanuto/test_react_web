import {WebConfig} from './WebConfig.js'

function util_RequestApi(method) {
    // your logic
    console.log(WebConfig.API_URL);
        let _fullpath = WebConfig.API_URL + '/' + method;
        return _fullpath;
 }
 
 function util_RequestApiTest(method) {
    // your logic
    console.log(WebConfig.API_URL);
        let _fullpath = WebConfig.API_URL + '/' + method;
        alert(_fullpath);
        return _fullpath;
 }
 function formatDate(date) {
    // your logic
 }
 
 // Now you have to export each function you want
 export {
    util_RequestApi
    , util_RequestApiTest
 };
