const URL = "6c837dfcef697002afd6a4d3377a8f81&q="
const section = document.getElementById("weather")
const form = document.querySelector("form")
const search = document.getElementById("weather-search")

form.onclick = async(e) => { e.preventDefault()
  userQuery = search.value
  search.value = ""
    if (!userQuery){
        return
    }
  const forecast = await fetch('https://api.openweathermap.org/data/2.5/weather?units=imperial&appid=' + URL + userQuery)
  .catch()
  const notation = await forecast.json()
    if ((notation.cod && notation.cod != 200) || notation.data){
      locationNotFound()
      return
    } info(notation)
};

const locationNotFound = () => { section.innerHTML = ""
  errorMessage = document.createElement('h2')
  errorMessage.textContent = 'Location not found'
  section.replaceChildren(errorMessage)
};

const info = ({name, sys, coord, weather, main, dt,}) => { section.innerHTML = ""
  h2 = document.createElement('h2')
  h2.textContent = (name + ',' + sys.country)

  mapLink = document.createElement('a')
  mapLink.href = ('https://www.google.com/maps/search/?api=1&query=' + coord.lat + ',' + coord.lon)
  mapLink.textContent = 'Click to view map'
  section.appendChild(mapLink).setAttribute('target','_blank')

  icon = document.createElement('img')
  icon.src = ('https://openweathermap.org/img/wn/' + weather[0].icon + '@2x.png')
  icon.alt = 'graphic icon'

  textDescription = document.createElement('p')
  textDescription.style.textTransform = 'capitalize'
  textDescription.textContent = weather[0].description

  current = document.createElement('p')
  current.innerHTML = ('Current: ' + main.temp + '\u2109')

  feelsLike = document.createElement('p')
  feelsLike.innerHTML = ('Feels like: ' + main.feels_like + '\u2109')

  lastUpdated = document.createElement('p')
  const date = new Date(dt * 1000)
  const timeString = date.toLocaleTimeString('en-US',{
      hour: 'numeric',
      minute: '2-digit'
  })
  lastUpdated.textContent = ('Last updated: ' + timeString)
  section.replaceChildren(h2, mapLink, icon, textDescription, current, feelsLike, lastUpdated)
};