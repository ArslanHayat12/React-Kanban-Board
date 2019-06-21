import {UPDATE_DATA} from "../constants/";
import {initialContent} from "../context/"; 
export const reducer=(state:any, action:any)=>{
    switch (action.type) {
      case UPDATE_DATA:
        return {
          value: action.value,
          message: action.message
        }
      default:
        return initialContent
    }
  };