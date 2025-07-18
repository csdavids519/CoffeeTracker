import { coffeeOptions } from "../utils"
import { useState } from "react"
import Modal from "./Modal"
import Authentication from "./Authentication"


export default function CoffeeForm(props) {
    const { isAuthenticated } = props
    const [showModal, setShowModal] = useState(false)
    const [selectedCoffee, setSelectedCoffee] = useState(null)
    const [showCoffeeTypes, setShowCoffeeTypes] = useState(false)
    const [coffeeCost, setCoffeeCost] = useState(0) // required so we can access the data after form submitted
    const [hour, setHour] = useState(0)
    const [min, setMin] = useState(0)

    function handleSubmitForm() {
        if (!isAuthenticated) {
            setShowModal(true)
            return
        }
        console.log(selectedCoffee, coffeeCost, hour, min)
    }

    function handleCloseModal() {
        setShowModal(false)
    }

    return (
        <>
            {showModal && (
                <Modal handleCloseModal={handleCloseModal}>
                    <Authentication handleCloseModal={handleCloseModal} />
                </Modal>
            )}
            <div className="section-header">
                <i className="fa-solid fa-pencil" />
                <h2>Start Tracking Today</h2>
            </div>
            <h4>Select coffee type</h4>
            <div className="coffee-grid">
                {coffeeOptions.slice(0, 5).map((option, optionIndex) => {   //get coffee options dict and split the first 5 items. use map to seperate and use the data to create buttons
                    return (
                        // on click set coffeesplection to value from option.name
                        <button onClick={() => {
                            setSelectedCoffee(option.name)
                            setShowCoffeeTypes(false)
                            // dynamic className to show what has been clicked
                        }} className={"button-card" + (option.name ===
                            selectedCoffee ? 'coffee-button-selected' : '')}
                            key={optionIndex}>
                            <h4>{option.name}</h4>
                            <p>{option.caffeine} mg</p>
                        </button>
                    )
                })}
                {/* // on click sets the use statshowCoffeeTypes to true, when button is clicked */}
                <button onClick={() => {
                    setShowCoffeeTypes(true)
                    setSelectedCoffee(null)
                }} className={"button-card" + (showCoffeeTypes ? 'coffee-button-selected' : '')}>
                    <h4>Other</h4>
                    <p>-</p>
                </button>
            </div >
            {/* use showCoffeeTypes to hide or show the select list. state is set above at onclick for the buttons. show if "Other" button is pressed  */}
            {
                showCoffeeTypes && (
                    <select onChange={(e) => {
                        setSelectedCoffee(e.target.value)
                    }} id="coffee-list" name="coffee-list"> {/* html dropdown selection list */}
                        <option value={null}>Select type</option>  {/* create the fist select option as null with default text */}
                        {coffeeOptions.map((option, optionIndex) => {
                            {/*get coffee options and map them out to create a option value for each item in the array */ }
                            return (
                                <option value={option.name} key={optionIndex}>
                                    {option.name} ({option.caffeine}mg)
                                </option>
                            )
                        })}
                    </select>
                )
            }
            <h4>Add the cost ($)</h4>
            {/* useState coffeeCost as a type number. on Change update coffee cost to the input value. value is displaying the current value in the coffeeCost useState*/}
            <input className="w-full" type="number" value={coffeeCost} onChange={(e) => {
                setCoffeeCost(e.target.value)
            }} placeholder="4.50" />
            <h4>Time since consumption</h4>
            <div className="time-entry">
                <div>
                    <h6>Hours</h6>
                    <select onChange={(e) => {
                        setHour(e.target.value)
                    }} id="hours-select">
                        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23].map((hour, hourIndex) => {
                            return (
                                <option key={hourIndex} value={hour}>{hour}</option>
                            )
                        })}
                    </select>
                </div>
                <div>
                    <h6>Minutes</h6>
                    <select onChange={(e) => {
                        setMin(e.target.value)
                    }} id="mins-select">
                        {[0, 5, 10, 15, 30, 45].map((min, minIndex) => {
                            return (
                                <option key={minIndex} value={min}>{min}</option>
                            )
                        })}
                    </select>
                </div>
                <button onClick={handleSubmitForm}>Add Entry</button>
            </div>
        </>
    )
}