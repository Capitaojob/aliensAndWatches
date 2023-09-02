import { playAudio, randomTurnAudio } from "./audio.js"
import { changeBackColor, hideAlienName, showAlienName, showPlaylist } from "./interface.js"
import { changeAlien, changePlaylist, currentAlienId } from "./index.js"

export const omnitrixDisplay = document.querySelector("#omnitrix .frame")
export const omnitrixBtn = document.querySelector("#omnitrix .green-btn")
const alienSilhouette = document.querySelector(".alien-silhouette")
export const root = document.querySelector(":root")

let omnitrixTimeoutId = 0

// Event Handlers
export const auxiliaryClick = () => {
    if (omnitrixDisplay.classList.contains("active")) {
        toggleOmnitrixDisplay()
        playAudio("../sounds/noise.ogg")
    }
    if (!omnitrixDisplay.classList.contains("up")) {
        hideAlienName()
    }
}

export const auxiliaryHold = (e) => {
    e.preventDefault()

    changePlaylist()
    if (omnitrixDisplay.classList.contains("up")) {
        showAlienName()
        showAlienImage()
    }
    showPlaylist()

    playAudio("../sounds/noise.ogg")
}

export const displayClick = () => {
    if (!omnitrixDisplay.classList.contains("processing")) {
        if (isOmnitrixDisplayUp()) {
            // Transform
            omnitrixTransform()
        } else if (!omnitrixDisplay.classList.contains("active") && !omnitrixDisplay.classList.contains("inactive")) {
            // Detransform and deactivate
            omnitrixDetransform()
        } else if (omnitrixDisplay.classList.contains("inactive")) {
            // Reactivate
            omnitrixReactivate()
        }
    }
}

export const displayHold = (e) => {
    e.preventDefault()
    if (
        omnitrixDisplay.classList.contains("up") &&
        !(omnitrixDisplay.classList.contains("rotate-right") || omnitrixDisplay.classList.contains("rotate-left"))
    ) {
        let isRight = e.clientX >= window.innerWidth / 2
        isRight ? turnOmnitrix("right") : turnOmnitrix("left")
    }
}

// Display Manipulation
export const isOmnitrixDisplayUp = () => {
    if (omnitrixDisplay.classList.contains("up")) {
        return true
    }
    return false
}

export const toggleOmnitrixDisplay = () => {
    if (omnitrixDisplay.classList.contains("up")) {
        omnitrixDisplay.style.transform = "scale(1)"
        omnitrixChangeDisplayState(false)
    } else {
        omnitrixDisplay.style.transform = "scale(1.1)"
        playAudio("./sounds/alien_choose_initiate.ogg")
        showAlienName()

        setTimeout(() => {
            omnitrixChangeDisplayState()
            showAlienImage()
        }, 800)
    }
    omnitrixDisplay.classList.toggle("up")
}

// Display Click Omnitrix States
export const omnitrixDetransform = () => {
    playAudio("./sounds/end.ogg")
    clearTimeout(omnitrixTimeoutId)
    omnitrixTimeOut()
    hideAlienName()
}

export const omnitrixTransform = () => {
    toggleOmnitrixDisplay()
    setOmnitrixTimeout()
    playAudio("./sounds/transformation_1.ogg")
    omnitrixDisplay.classList.remove("active")

    transformOmnitrix()
}

export const omnitrixReactivate = () => {
    playAudio("./sounds/initiate.ogg")
    omnitrixDisplay.classList.remove("inactive")
    omnitrixBtn.classList.remove("inactive")
    omnitrixDisplay.classList.add("active")
    transformOmnitrix()
}

// Timeout Logic
export const setOmnitrixTimeout = () => {
    omnitrixTimeoutId = setTimeout(() => {
        omnitrixDetransform()
    }, 60000)
}

export const omnitrixTimeOut = () => {
    let isTimingOut = true

    omnitrixDisplay.classList.toggle("inactive")
    omnitrixDisplay.classList.add("processing")

    setInterval(() => {
        if (!isTimingOut) {
            return
        }
        omnitrixDisplay.classList.toggle("inactive")
    }, 500)

    setTimeout(() => {
        isTimingOut = false
        omnitrixDisplay.classList.add("inactive")
        omnitrixBtn.classList.add("inactive")
        omnitrixDisplay.classList.remove("processing")
        transformOmnitrix()
    }, 3000)
}

// Animations
export const turnOmnitrix = (direction) => {
    randomTurnAudio()
    let rotation = direction == "right" ? "rotate-right" : "rotate-left"

    changeAlien(direction)

    showAlienName()
    showAlienImage()

    omnitrixDisplay.classList.add(rotation)
    setTimeout(() => {
        omnitrixDisplay.classList.remove(rotation)
    }, 500)
}

export const transformOmnitrix = () => {
    if (omnitrixDisplay.classList.contains("inactive")) {
        root.style.setProperty("--og-frame", 'url("../images/new-frame-red.png")')
        root.style.setProperty("--base", 'url("../images/base.png")')
        omnitrixBtn.style.display = "block"
        changeBackColor(false)
    } else if (omnitrixDisplay.classList.contains("active")) {
        root.style.setProperty("--og-frame", 'url("../images/new-frame.png")')
    } else {
        root.style.setProperty("--og-frame", 'url("../images/frame.png")')
        root.style.setProperty("--base", "none")
        omnitrixBtn.style.display = "none"
        changeBackColor(true)
    }
}

export const omnitrixChangeDisplayState = (waitingForInput = true) => {
    const innerFrame = document.querySelector("#omnitrix .inner-frames")
    innerFrame.style.backgroundImage = `url("../images/frames${waitingForInput == true ? "-selection" : ""}.png")`
}

//Alien Test
const showAlienImage = () => {
    alienSilhouette.style.backgroundImage = `url("../images/aliens/${parseInt(currentAlienId) + 1}.png")`
}
