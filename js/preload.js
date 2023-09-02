const imagePaths = ["images/alien-display-frame.png"]
export const images = []

const audioPaths = ["alien_choose_initiate.ogg", "end.ogg", "initiate.ogg", "left_turn.ogg", "right_turn.ogg", "transformation_1.ogg"]
const omnitrixAudios = []

export function preloadImages() {
    // Create a new Image object for each image path
    const totalImages = imagePaths.length
    for (let i = 0; i < totalImages; i++) {
        images[i] = new Image()
        images[i].src = imagePaths[i]
        images[i].onload = function () {
            console.log("image loaded")
        }
    }
}

function preloadAudios() {
    // Create a new Audio object for each image path
    const totalAudios = audioPaths.length
    for (let i = 0; i < totalAudios; i++) {
        omnitrixAudios[i] = new Audio()
        omnitrixAudios[i].src = audioPaths[i]
        omnitrixAudios[i].onload = function () {
            console.log("audio loaded")
        }
    }
}
