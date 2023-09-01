import { preloadImages, images } from "./preload.js"
import { playlistMatrix, alienColorsMatrix } from "./playlist.js"

const omnitrix = document.querySelector("#omnitrix")
const omnitrixBtn = document.querySelector("#omnitrix .green-btn")
const omnitrixDisplay = document.querySelector("#omnitrix .frame")
const root = document.querySelector(":root")

// Text Elements
const alienName = document.querySelector("#alienName")
const playlist = document.querySelector("#playlist")

// JS Variables
let playlistTimeout = 0
let omnitrixTimeoutId = 0

// Event Listeners
omnitrixBtn.addEventListener("click", () => {
    if (omnitrixDisplay.classList.contains("active")) {
        toggleOmnitrixDisplay()
        playAudio("../sounds/noise.ogg")
    }
    if (!omnitrixDisplay.classList.contains("up")) {
        hideAlienName()
    }
})

omnitrixBtn.addEventListener("contextmenu", (e) => {
    e.preventDefault()

    changePlaylist()
    if (omnitrixDisplay.classList.contains("up")) showAlienName()
    showPlaylist()

    playAudio("../sounds/noise.ogg")
})

omnitrixDisplay.addEventListener("click", () => {
    if (!omnitrixDisplay.classList.contains("processing")) {
        if (isOmnitrixDisplayUp()) {
            // Transform
            toggleOmnitrixDisplay()
            setOmnitrixTimeout()
            playAudio("./sounds/transformation_1.ogg")
            omnitrixDisplay.classList.remove("active")

            transformOmnitrix()
        } else if (!omnitrixDisplay.classList.contains("active") && !omnitrixDisplay.classList.contains("inactive")) {
            // Detransform and deactivate
            omnitrixDetransform()
        } else if (omnitrixDisplay.classList.contains("inactive")) {
            // Reactivate
            playAudio("./sounds/initiate.ogg")
            omnitrixDisplay.classList.remove("inactive")
            omnitrixBtn.classList.remove("inactive")
            omnitrixDisplay.classList.add("active")
            transformOmnitrix()
        }
    }
})

omnitrixDisplay.addEventListener("contextmenu", (e) => {
    e.preventDefault()
    if (
        omnitrixDisplay.classList.contains("up") &&
        !(omnitrixDisplay.classList.contains("rotate-right") || omnitrixDisplay.classList.contains("rotate-left"))
    ) {
        let isRight = e.clientX >= window.innerWidth / 2
        isRight ? turnOmnitrix("right") : turnOmnitrix("left")
    }
})

// Functions

const isOmnitrixDisplayUp = () => {
    if (omnitrixDisplay.classList.contains("up")) {
        return true
    }
    return false
}

const toggleOmnitrixDisplay = () => {
    if (omnitrixDisplay.classList.contains("up")) {
        omnitrixDisplay.style.transform = "scale(1)"
        omnitrixDefaultStateAnimation()
    } else {
        omnitrixDisplay.style.transform = "scale(1.1)"
        playAudio("./sounds/alien_choose_initiate.ogg")
        showAlienName()

        setTimeout(() => {
            omnitrixActivateAnimation()
        }, 800)
    }
    omnitrixDisplay.classList.toggle("up")
}

const setOmnitrixTimeout = () => {
    omnitrixTimeoutId = setTimeout(() => {
        omnitrixDetransform()
    }, 60000)
}

const omnitrixDetransform = () => {
    playAudio("./sounds/end.ogg")
    clearTimeout(omnitrixTimeoutId)
    omnitrixTimeOut()
    hideAlienName()
}

const turnOmnitrix = (direction) => {
    randomTurnAudio()
    // omnitrixDisplay.style.animation = (direction == "right" ? "rotateDisplay" : "rotateDisplayBack") + " 1s ease-in-out "
    let rotation = direction == "right" ? "rotate-right" : "rotate-left"

    changeAlien(direction)

    showAlienName()

    omnitrixDisplay.classList.add(rotation)
    setTimeout(() => {
        omnitrixDisplay.classList.remove(rotation)
    }, 500)
}

const omnitrixTimeOut = () => {
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

const omnitrixActivateAnimation = () => {
    const light = document.querySelector("#omnitrix .lights")
    const frames = document.querySelectorAll("#omnitrix .inner-frames .inner-frame")
    const thisFrame = document.querySelector("#omnitrix .inner-frames")

    const parameters = "1s forwards ease-in"

    light.style.animation = "lightSizeUp " + parameters
    frames[0].style.animation = "joinSideLeft " + parameters
    frames[1].style.animation = "joinSideLeft " + parameters
    frames[2].style.animation = "joinSideRight " + parameters

    setTimeout(() => {
        light.style.display = "none"
        frames.forEach((frame) => (frame.style.display = "none"))
        thisFrame.style.backgroundImage = `url("${images[0].src}")` //'url("../images/alien-display-frame.png")'
    }, 1000)
}

const omnitrixDefaultStateAnimation = () => {
    const light = document.querySelector("#omnitrix .lights")
    const frames = document.querySelectorAll("#omnitrix .inner-frames .inner-frame")
    const thisFrame = document.querySelector("#omnitrix .inner-frames")

    light.style.animation = "none"
    frames.forEach((frame) => (frame.style.animation = "none"))

    light.style.display = "block"
    frames.forEach((frame) => (frame.style.display = "block"))
    thisFrame.style.backgroundImage = ""
}

const changeBackColor = (isTransforming = true) => {
    root.style.setProperty("--background-color", isTransforming == true ? alienColorsMatrix[currentPlaylist][currentAlienId] : "blueviolet")
}

const playAudio = (audioFile) => {
    let audio = new Audio(audioFile)
    audio.play()
}

const randomTurnAudio = () => {
    let audio = new Audio(Math.random() > 0.5 ? "./sounds/left_turn.ogg" : "./sounds/right_turn.ogg")
    audio.play()
}

const changePlaylist = () => {
    if (currentPlaylist < playlistMatrix.length - 1) {
        currentPlaylist++
    } else {
        currentPlaylist = 0
    }
}

const changeAlien = (direction) => {
    if (direction == "right") {
        if (currentAlienId < 9) {
            currentAlienId++
        } else {
            currentAlienId = 0
        }
    } else {
        if (currentAlienId > 0) {
            currentAlienId--
        } else {
            currentAlienId = 9
        }
    }

    showAlienName()
    storeAlienAndPlaylistInLocalStorage()
}

const showPlaylist = () => {
    playlist.innerText = "Playlist " + (currentPlaylist + 1)

    clearTimeout(playlistTimeout)

    playlistTimeout = setTimeout(() => {
        playlist.innerText = ""
    }, 2000)
}

const showAlienName = () => {
    alienName.innerText = playlistMatrix[currentPlaylist][currentAlienId]
}

const hideAlienName = () => {
    alienName.innerText = ""
}

const storeAlienAndPlaylistInLocalStorage = () => {
    localStorage.setItem("alienId", currentAlienId)
    localStorage.setItem("playlist", currentPlaylist)
}

// Gets

const getPlaylist = () => {
    const playlist = localStorage.getItem("playlist")
    return playlist !== null ? playlist : 0
}

const getAlienID = () => {
    const alienID = localStorage.getItem("alienId")
    return alienID !== null ? alienID : 0
}

let currentPlaylist = getPlaylist()
let currentAlienId = getAlienID()

// Call the preloadImages function
preloadImages()
