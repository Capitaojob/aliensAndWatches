import { playAudio, randomTurnAudio } from "./audio.js"
import { changeBackColor, hideAlienName, showAlienName, showAuxiliaryText } from "./interface.js"
import { changeAlien, changeCurrentPlaylist, currentAlienId, currentPlaylist, isMasterControl, storeMasterControlInLocalStorage } from "./index.js"

export const omnitrix = document.querySelector("#omnitrix")
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
        playAudio("../assets/sounds/noise.ogg")
    }
    if (!omnitrixDisplay.classList.contains("up")) {
        hideAlienName()
        hideAlienImage()
        resetSequence()
    }
}

export const auxiliaryHold = (e) => {
    e.preventDefault()

    changeAndShowPlaylist("forwards")
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
        } else {
            turnOmnitrix("left")
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
        omnitrixDisplayChangeInnerFrameImage()
    } else {
        omnitrixDisplay.style.transform = "scale(1.1)"
        playAudio("../assets/sounds/alien_choose_initiate.ogg")
        showAlienName()

        omnitrixDisplay.classList.add("processing")

        setTimeout(() => {
            omnitrixDisplayChangeInnerFrameImage()
            showAlienImage()
            omnitrixDisplay.classList.remove("processing")
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
    if (!isMasterControl) setOmnitrixTimeout(60000)
    hideAlienImage()
    updateCurrentSequence("clear")
    playAudio("../assets/sounds/transformation_1.ogg")
    omnitrixDisplay.classList.remove("active")

    transformOmnitrix()
}

const omnitrixReactivate = () => {
    if (!isMasterControl) clearTimeout(omnitrixTimeoutId)
    playAudio("../assets/sounds/initiate.ogg")
    omnitrixDisplay.classList.remove("inactive")
    omnitrixBtn.classList.remove("inactive")
    omnitrixDisplay.classList.add("active")
    transformOmnitrix()
}

// Timeout Logic
const setOmnitrixTimeout = (time) => {
    omnitrixTimeoutId = setTimeout(() => {
        omnitrixDetransform()
    }, time)
}

const setOmnitrixReactivateTimeout = (time) => {
    omnitrixTimeoutId = setTimeout(() => {
        omnitrixReactivate()
    }, time)
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
        playAudio("../assets/sounds/end.ogg")

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
            setOmnitrixReactivateTimeout(30000)
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
    if (omnitrixDisplay.classList.contains("processing")) {
        return
    }
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
        omnitrixDisplay.classList.toggle("transformed-frame")
        omnitrixDisplay.classList.toggle("inactive-frame")
        omnitrix.classList.toggle("no-base")
        omnitrixBtn.style.display = "block"
        changeBackColor(false)
    } else if (omnitrixDisplay.classList.contains("active")) {
        omnitrixDisplay.classList.toggle("inactive-frame")
    } else {
        omnitrixDisplay.classList.toggle("transformed-frame")
        omnitrix.classList.toggle("no-base")
        omnitrixBtn.style.display = "none"
        changeBackColor(true)
    }
}

const omnitrixDisplayChangeInnerFrameImage = () => {
    const innerFrame = document.querySelector("#omnitrix .inner-frames")
    innerFrame.classList.toggle("inner-frame-selection")
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

//Alien and Playlist Change
const showAlienImage = () => {
    let alienImageName = parseInt(currentAlienId) + 1 + currentPlaylist * 10
    // alienSilhouette.style.backgroundImage = alienImageName == 1 ? `url("../assets/images/aliens/${alienImageName}.png")` : "none"
    alienSilhouette.style.backgroundImage = `url("../assets/images/aliens/${alienImageName}.png")`
}

const hideAlienImage = () => {
    alienSilhouette.style.backgroundImage = "none"
}

export const changeAndShowPlaylist = (direction) => {
    changeCurrentPlaylist(direction)

    if (omnitrixDisplay.classList.contains("up")) {
        showAlienName()
        showAlienImage()
    }
    showAuxiliaryText("playlist")

    playAudio("../assets/sounds/noise.ogg")
}
