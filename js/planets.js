const planets = document.querySelectorAll(".planet")
const planetCard = document.querySelector(".planet-card")

planetCard.querySelector("i").addEventListener("click", () => {
    planetCard.style.display = "none"
})

window.onload = () => {
    setTimeout(() => {
        document.querySelector(".loading").style.opacity = "0"

        planets.forEach((planet) => {
            const planetSize = planet.getBoundingClientRect()

            const left = Math.floor(Math.random() * (window.innerWidth - planetSize.width)) + "px"
            const top = Math.floor(Math.random() * (window.innerHeight - planetSize.height)) + "px"
            planet.style.left = left
            planet.style.top = top
            const distance = Math.random() * 0.5 + 0.5
            planet.style.filter = `brightness(${distance})`
            planet.style.zIndex = distance * 1000
            // planet.style.transform = `rotate(${Math.floor(Math.random() * 360) + "deg"})`

            planet.addEventListener("click", (e) => {
                planetClickEvent(e)
            })
        })

        setTimeout(() => {
            document.querySelector(".loading").style.display = "none"
        }, 200)
    }, 500)
}

const planetClickEvent = (e) => {
    if (e.target.currentSrc == undefined) {
        return
    }
    planetCard.style.display = "flex"
    planetCard.querySelector("img").src = e.target.currentSrc
    planetCard.querySelector("h1").innerHTML = e.target.dataset.name
    planetCard.querySelector("h3").innerHTML = e.target.alt
}
