// Variaveis e seleção de elementos
const apiKey = "0535d0b65386eced2f0d690248605615";
const apiCountryURL = "https://flagsapi.com/"

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const umidityElement = document.querySelector("#umidity span");
const windElement = document.querySelector("#wind span");

const containerForm = document.querySelector(".principal");

const weatherContainer = document.querySelector("#weather-data");

const mensagemError = document.querySelector(".msg-error");

const form = document.querySelector(".form")

/* console.log(tempElement)
 */// funcões
const getWeatherData = async(city) => {
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`
    const res = await fetch(apiWeatherURL)
    const data = await res.json()

   return data;

};
const showWeatherData = async(city) => {
    try {
    const data = await getWeatherData(city);

    cityElement.innerText = data.name;
    tempElement.innerText = parseInt(data.main.temp);
    descElement.innerText = data.weather[0].description;

    weatherIconElement.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
    countryElement.setAttribute("src", apiCountryURL + data.sys.country + "/flat/64.png");
    umidityElement.innerText = `${data.main.humidity}%`
    windElement.innerText = `${data.wind.speed}km/h`
    console.log(data)

    weatherContainer.classList.remove("hide")
    weatherContainer.classList.add("city")
    mensagemError.style.display = "none"
    weatherContainer.style.display = "block"

    fundo(data.weather[0].description)
    
    } 

    catch (error) {
           
        mensagemError.innerText = "cidade não encontrada"
        weatherContainer.style.display = "none"
        mensagemError.style.display = "block"

            
        }


}

function fundo(descricao){
    if(descricao == "nuvens dispersas"){
        containerForm.style.backgroundColor = "CadetBlue";
    } else if (descricao == "céu limpo") {
        containerForm.style.backgroundColor = "DeepSkyBlue";
       console.log("teste")
    } else {
        containerForm.style.backgroundColor = "Coral"
    }
}



// Eventos
searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const city = cityInput.value
    showWeatherData(city)
})

cityInput.addEventListener("keyup", (e) => {
    if(e.code === "Enter") {
        const city = e.target.value

        showWeatherData(city)
    }
})



