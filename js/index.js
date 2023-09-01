import { playlistMatrix, alienColorsMatrix } from "./aliens.js"

const omnitrix = document.querySelector("#omnitrix")
const omnitrixBtn = document.querySelector("#omnitrix .green-btn")
const omnitrixDisplay = document.querySelector("#omnitrix .mid-portion .frame")
const lights = document.querySelector("#omnitrix .lights")
const root = document.querySelector(":root")

// Text Elements
const alienName = document.querySelector("#alienName")
const playlist = document.querySelector("#playlist")

// JS Variables
let timeout = 0

// Event Listeners
omnitrixBtn.addEventListener("click", () => {
    if (omnitrixDisplay.classList.contains("active")) {
        toggleOmnitrixDisplay()
        playAudio("../sounds/beep.ogg")
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

    playAudio("../sounds/beep.ogg")
})

omnitrixDisplay.addEventListener("click", () => {
    if (!omnitrixDisplay.classList.contains("processing")) {
        if (isOmnitrixDisplayUp()) {
            // Transform
            toggleOmnitrixDisplay()
            playAudio("./sounds/transformation_1.ogg")
            omnitrixDisplay.classList.remove("active")

            transformOmnitrix()
        } else if (!omnitrixDisplay.classList.contains("active") && !omnitrixDisplay.classList.contains("inactive")) {
            // Detransform and deactivate
            playAudio("./sounds/end.ogg")
            omnitrixTimeOut()
            hideAlienName()
        } else if (omnitrixDisplay.classList.contains("inactive")) {
            // Reactivate
            playAudio("./sounds/initiate.ogg")
            omnitrixDisplay.classList.remove("inactive")
            omnitrixDisplay.classList.add("active")
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
    if (!omnitrixDisplay.classList.contains("up")) {
        omnitrixDisplay.style.transform = "scale(1.1)"
        playAudio("./sounds/alien_choose_initiate.ogg")
        showAlienName()
    } else {
        omnitrixDisplay.style.transform = "scale(1)"
    }
    omnitrixDisplay.classList.toggle("up")
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
        omnitrixDisplay.classList.remove("processing")
        transformOmnitrix()
    }, 3000)
}

const transformOmnitrix = () => {
    if (!omnitrixDisplay.classList.contains("inactive")) {
        root.style.setProperty("--og-frame", 'url("../images/frame.png")')
        root.style.setProperty("--base", "none")
        omnitrixBtn.style.display = "none"
        changeBackColor(true)
    } else {
        root.style.setProperty("--og-frame", 'url("../images/new-frame.png")')
        root.style.setProperty("--base", 'url("../images/base.png")')
        omnitrixBtn.style.display = "block"
        changeBackColor(false)
    }
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

    clearTimeout(timeout)

    timeout = setTimeout(() => {
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
