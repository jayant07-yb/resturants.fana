import { Fragment } from "react"
import food from "../../assets/food.jpeg"

const FoodItems = ({foodData , active , index , size}) => {
    return(
        <Fragment>
            <div
              style={{ borderBottom: index < size-1 ? "dashed 1px" : "" , paddingBottom : "20px"}}
              className={`border-b-black dark:border-b-slate-500 flex flex-row justify-center items-center mx-4 my-4 items-container  overflow-hidden ${
                active ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="food-details-container basis-1/2">
                <h1 style={{fontSize : "18px" , fontWeight : "700" }}>Chocolate almond Praline Ice Cream</h1>
                <div className="cost my-4">$540</div>
                <div className="food-details">
                  Lorem ipsum dolor sit amet.
                </div>
              </div>
              <div className="basis-1/2 food-image-container flex flex-col items-center justify-center relative">
                <img className="rounded-xl" src={food} alt="" />
                <div  className="absolute btn-container rounded-md text-white  bg-secondary-bg dark:bg-secondary-bg-dark px-2 py-2 text-center" style={{width : "50%" ,bottom : "-25%" , left :"30%"}}>Add</div>
              </div>
            </div>

        </Fragment>
    )
}

export default FoodItems;