import logo from './Capture.png'
import add_icon from './add_icon.png'
import order_icon from './order_icon.png'
import profile_image from './profile_image.png'
import upload_area from './upload_area.png'
import parcel_icon from './parcel_icon.png'
import { toast } from 'react-toastify'

let successMsg =(msg)=>{
    return toast.success(msg,{autoClose:2500,position:"top-center"})
}
let ErrorMsg =(msg)=>{
    return toast.error(msg,{autoClose:2500,position:"top-center"})
}

export const assets ={
    logo,
    add_icon,
    order_icon,
    profile_image,
    upload_area,
    parcel_icon,
    successMsg,
    ErrorMsg
}



export const url = 'http://localhost:4000'