
// used to select the id's in html file
const temperatureField = document.querySelector(".temp");
const locationField = document.querySelector(".time_location p");
const dateandTimeFiled = document.querySelector(".time_location span");
const conditionFiled = document.querySelector(".condition p");
const searchField = document.querySelector(".search_area");
const form = document.querySelector("form");


//call the search for location while  we click search button
form.addEventListener('submit', searchForLocation)


let target = 'bangalore'

const fetchResults = async (targetLocation) => {
    let url = `http://api.weatherapi.com/v1/current.json?key=8d6b71dd46e646f1b8461912230701&q=${targetLocation}&aqi=no`
    const res = await fetch(url)

    //we have to change this responce into JSON data
    const data = await res.json()


    console.log(data)

    //this variables get the data needed to app from the api like --> inside data location , inside location you get name and etc

    let locationName = data.location.name
    let time = data.location.localtime

    let temp = data.current.temp_c
    let condition = data.current.condition.text

    //call the updateDetails function
    updateDetails(temp, locationName, time, condition)
}

//function to  cahnge the value dynamically
function updateDetails(temp, locationName, time, condition) {

    //split method  splits a string into an array of substrings
    // weare slpiting cuz --> we need day in between date and time 
    let splitDate = time.split(' ')[0]
    let splitTime = time.split(' ')[1]

    //using day method of javsascript to print day 
    let currentDay = getDayName (new Date(splitDate).getDay()) //using this method you will be fetting 0 -1 instead of daay like monday etc



    temperatureField.innerText = temp
    locationField.innerText = locationName
    dateandTimeFiled.innerText = `${splitDate} ${currentDay} ${splitTime}`
    conditionFiled.innerText = condition



}

//search functionality

function searchForLocation(e) {
    e.preventDefault()

    target = searchField.value

    fetchResults(target)
}

fetchResults(target)

function getDayName(number) {
    switch (number) {
        case 0:
            return 'sunday'
        case 1:
            return 'monday'
        case 2:
            return 'tuesday'
        case 3:
            return 'wednesday'
        case 4:
            return 'thursday'
        case 5:
            return 'friday'
        case 6:
            return 'saturday'


    }
}