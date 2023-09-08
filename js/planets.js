const planets = document.querySelectorAll(".planet")
const planetCard = document.querySelector(".planet-card")

planetCard.querySelector("i").addEventListener("click", () => {
    planetCard.style.display = "none"
})

window.onload = () => {
    setTimeout(() => {
        document.querySelector(".loading").style.opacity = "0"
        const isInvert = window.innerWidth < window.innerHeight ? true : false
        console.log(isInvert)

        planets.forEach((planet) => {
            const planetSize = planet.getBoundingClientRect()

            // const left = Math.floor(Math.random() * (window.innerWidth - planetSize.width)) + "px"
            // const top = Math.floor(Math.random() * (window.innerHeight - planetSize.height)) + "px"
            const left = Math.floor(Math.random() * (isInvert ? window.innerHeight * 2 : window.innerWidth * 2)) + "px"
            const top = Math.floor(Math.random() * (isInvert ? window.innerHeight * 3 : window.innerHeight * 2)) + "px"
            planet.style.left = left
            planet.style.top = top
            const distance = Math.random() * 0.25 + 0.7
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

const setRandomFavicon = () => {
    // Array of image URLs in your directory
    const imageUrls = [
        "../assets/videos/arburia.gif",
        "../assets/videos/galvan-prime.gif",
        "../assets/videos/lepidopterra.gif",
        "../assets/videos/mikd'lty.gif",
        "../assets/videos/piscciss.gif",
        "../assets/videos/pyros.gif",
        "../assets/videos/petropia.png",
        "../assets/videos/peptosxii.gif",
    ]

    // Set a random image as the favicon
    const randomIndex = Math.floor(Math.random() * imageUrls.length)
    const selectedImageUrl = imageUrls[randomIndex]

    const link = document.createElement("link")
    link.rel = "icon"
    link.type = "image/x-icon"
    link.href = selectedImageUrl

    // Remove any existing favicon
    const existingFavicon = document.querySelector('link[rel="icon"]')
    if (existingFavicon) {
        document.head.removeChild(existingFavicon)
    }

    document.head.appendChild(link)
}

setRandomFavicon()
