import { playAudio, randomTurnAudio } from "./audio.js"
import { changeBackColor, hideAlienName, showAlienName, showAuxiliaryText } from "./interface.js"
import { changeAlien, changePlaylist, currentAlienId, currentPlaylist, isMasterControl, storeMasterControlInLocalStorage } from "./index.js"

export const omnitrixDisplay = document.querySelector("#omnitrix .frame")
export const omnitrixBtn = document.querySelector("#omnitrix .green-btn")
const alienSilhouette = document.querySelector(".alien-silhouette")
export const root = document.querySelector(":root")

let omnitrixTimeoutId = 0
let selfDestructId = 0
let currentSequence = ""

// Event Handlers
export const auxiliaryClick = () => {
    if (omnitrixDisplay.classList.contains("active")) {
        toggleOmnitrixDisplay()
        playAudio("../sounds/noise.ogg")
    }
    if (!omnitrixDisplay.classList.contains("up")) {
        hideAlienName()
        hideAlienImage()
        resetSequence()
    }
}

export const auxiliaryHold = (e) => {
    e.preventDefault()

    changePlaylist()
    if (omnitrixDisplay.classList.contains("up")) {
        showAlienName()
        showAlienImage()
    }
    showAuxiliaryText("playlist")

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
        if (isRight) {
            turnOmnitrix("right")
            // updateCurrentSequence("right")
        } else {
            turnOmnitrix("left")
            // updateCurrentSequence("left")
        }
    }
}

// Display Manipulation
const isOmnitrixDisplayUp = () => {
    if (omnitrixDisplay.classList.contains("up")) {
        return true
    }
    return false
}

const toggleOmnitrixDisplay = () => {
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
const omnitrixDetransform = () => {
    if (!isMasterControl) clearTimeout(omnitrixTimeoutId)
    omnitrixTimeOut()
    hideAlienName()
}

const omnitrixTransform = () => {
    toggleOmnitrixDisplay()
    if (!isMasterControl) setOmnitrixTimeout()
    hideAlienImage()
    updateCurrentSequence("clear")
    playAudio("./sounds/transformation_1.ogg")
    omnitrixDisplay.classList.remove("active")

    transformOmnitrix()
}

const omnitrixReactivate = () => {
    playAudio("./sounds/initiate.ogg")
    omnitrixDisplay.classList.remove("inactive")
    omnitrixBtn.classList.remove("inactive")
    omnitrixDisplay.classList.add("active")
    transformOmnitrix()
}

// Timeout Logic
const setOmnitrixTimeout = () => {
    omnitrixTimeoutId = setTimeout(() => {
        omnitrixDetransform()
    }, 60000)
}

const setOrRemoveSelfDestructTimeout = () => {
    if (selfDestructId != 0) {
        clearTimeout(selfDestructId)
        selfDestructId = 0
    } else {
        selfDestructId = setTimeout(() => {
            document.body.innerHTML = ""
        }, 60000)
    }
}

const omnitrixTimeOut = () => {
    let isTimingOut = true

    if (!isMasterControl) {
        playAudio("./sounds/end.ogg")

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
    } else {
        omnitrixDisplay.classList.add("inactive")
        omnitrixBtn.classList.add("inactive")
        omnitrixDisplay.classList.remove("processing")
        transformOmnitrix()
        omnitrixReactivate()
    }
}

// Animations
export const turnOmnitrix = (direction) => {
    randomTurnAudio()
    let rotation = direction == "right" ? "rotate-right" : "rotate-left"

    updateCurrentSequence(direction)
    changeAlien(direction)

    showAlienName()
    showAlienImage()

    omnitrixDisplay.classList.add(rotation)
    setTimeout(() => {
        omnitrixDisplay.classList.remove(rotation)
    }, 500)
}

const transformOmnitrix = () => {
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

const omnitrixChangeDisplayState = (waitingForInput = true) => {
    const innerFrame = document.querySelector("#omnitrix .inner-frames")
    innerFrame.style.backgroundImage = `url("../images/frames${waitingForInput == true ? "-selection" : ""}.png")`
}

// Omnitrix Sequence Commands
const updateCurrentSequence = (action) => {
    if (action == "right") {
        currentSequence += "1"
    } else if (action == "left") {
        currentSequence += "0"
    } else if (action == "clear") {
        resetSequence()
    }
    checkSequence()
}

const checkSequence = () => {
    if (currentSequence == "101001") {
        //01001101110010
        storeMasterControlInLocalStorage()
        showAuxiliaryText("masterControl")
    } else if (currentSequence == "00100100") {
        showAuxiliaryText(selfDestructId != 0 ? "removeSelfDestruct" : "selfDestruct")
        setOrRemoveSelfDestructTimeout()
    } else {
        return
    }

    resetSequence()
}

const resetSequence = () => {
    currentSequence = ""
}

//Alien Change
const showAlienImage = () => {
    let alienImageName = parseInt(currentAlienId) + 1 + currentPlaylist * 10
    alienSilhouette.style.backgroundImage = alienImageName == 1 ? `url("../images/aliens/${alienImageName}.png")` : "none"
}

const hideAlienImage = () => {
    alienSilhouette.style.backgroundImage = "none"
}
