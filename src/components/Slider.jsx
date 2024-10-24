import { Fragment, useState } from "react"
import InputBox from "./InputBox/InputBox";
import ThemeBtn from "./Buttons/ThemeBtn";

const Slider = () => {

    const [phn , setPhn] = useState(null);



    return(
        <Fragment>
            <div className="flex flex-col w-full items-center slider-container bg-white dark:bg-dark-bg absolute bottom-0" style={{borderRadius : "20px" ,height : "70%"}}>
                <div className="mark-div my-4" style={{backgroundColor : "gray" , width : "50px" , height : "3px" , borderRadius : "10px"}}></div>
                <div className="tab-div w-full mx-2">
                    <ul className="flex flex-row justify-between" >
                        <li style={{margin : "5% 10%"}}>Login</li>
                        <li style={{margin : "5% 10%"}}><ThemeBtn/></li>
                    </ul>
                </div>
                <div className="input-box-div" style={{width : "80%" ,margin : "0 10%"}}>
                    <InputBox type={"text"} label={"Phone Number"} setFunc={setPhn} />

                </div>
            </div>
        </Fragment>
    )
}


export default Slider;
