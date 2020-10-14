
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msgTemp = document.querySelector('#msgTemp')
const msglocation = document.querySelector('#msgLocation')
const msgforecast = document.querySelector('#msgForecast')

//By Default Text = "Loading"
// msgTemp.textContent  = "Loading"
// msglocation.textContent = "Loading"
// msgforecast.textContent = "Loading"


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value

    msglocation.textContent = "..."

    const url = "/api?address="+location
    fetch(url).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            console.log(data.error)
            msglocation.textContent = data.error

        }
        else{
            console.log(data)
            msgTemp.textContent  = data.temprature+" °C"
            msglocation.textContent = data.location
            msgforecast.textContent = data.forecast
        }
       
    })
})

})