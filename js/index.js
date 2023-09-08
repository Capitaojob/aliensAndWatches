import { showAlienName } from "./interface.js"
import { auxiliaryClick, auxiliaryHold, displayClick, displayHold, omnitrixBtn, omnitrixDisplay } from "./omnitrix.js"
import { handleTouchMove, handleTouchStart } from "./phone-handler.js"
import { generateFirstPlaylist, playlistMatrix } from "./playlist.js"

const menuArrow = document.querySelector("aside i")

// Event listeners and main application logic
omnitrixBtn.addEventListener("click", () => {
    auxiliaryClick()
})

omnitrixBtn.addEventListener("contextmenu", (e) => {
    auxiliaryHold(e)
})

omnitrixDisplay.addEventListener("click", () => {
    displayClick()
})

omnitrixDisplay.addEventListener("contextmenu", (e) => {
    displayHold(e)
})

menuArrow.addEventListener("click", () => {
    menuArrow.classList.toggle("fa-chevron-down")
    menuArrow.classList.toggle("fa-chevron-up")

    if (menuArrow.classList.contains("fa-chevron-up")) {
        document.querySelector("aside .menu").style.top = "0"
    } else {
        document.querySelector("aside .menu").style.top = "-100vh"
    }
})

// Local Storage Variable Manipulations
export const changePlaylist = (direction) => {
    if (direction == "forwards") {
        if (currentPlaylist < playlistMatrix.length - 1) {
            currentPlaylist++
        } else {
            currentPlaylist = 0
        }
    } else {
        if (currentPlaylist > 0) {
            currentPlaylist--
        } else {
            currentPlaylist = playlistMatrix.length - 1
        }
    }
}

export const changeAlien = (direction) => {
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

export const storeAlienAndPlaylistInLocalStorage = () => {
    localStorage.setItem("alienId", currentAlienId)
    localStorage.setItem("playlist", currentPlaylist)
}

export const storeMasterControlInLocalStorage = () => {
    isMasterControl = !isMasterControl

    localStorage.setItem("masterControl", isMasterControl)
}

export const storeUserAlienMatrixInLocalStorage = (specificMatrix = userAlienMatrix) => {
    localStorage.setItem("userAlienMatrix", specificMatrix)
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

const getMasterControl = () => {
    const storedMasterControl = localStorage.getItem("masterControl")
    if (storedMasterControl !== null) {
        return storedMasterControl === "true" ? true : false
    } else {
        return false
    }
}

const getAvailableAliens = () => {
    const storedAvailableAliens = localStorage.getItem("userAlienMatrix")
    return storedAvailableAliens !== null ? storedAvailableAliens : generateFirstPlaylist()
}

export let userAlienMatrix = getAvailableAliens()
export let currentPlaylist = getPlaylist()
export let currentAlienId = getAlienID()
export let isMasterControl = getMasterControl()
