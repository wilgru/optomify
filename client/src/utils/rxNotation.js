export const getSph = (rx) => {
    return  parseFloat(rx.split('/')[0]);
}

export const getCyl = (rx) => {
    const cylAxis = rx.split('/')[1];
    return  parseFloat(cylAxis.split('x')[0]);
}

export const getAxis = (rx) => {
    const cylAxis = rx.split('/')[1];
    return parseFloat(cylAxis.split('x')[1]);
}

export const createRxNotation = (sph, cyl, axis) => {
    let prefix = ""
    if (sph >= 0) {
        prefix = "+"
    }

    let sphPad = ""
    if (sph % 1 === 0) {
        sphPad = ".00"
    }

    let cylPad = ""
    if (sph % 1 === 0) {
        cylPad = ".00"
    }

    return prefix+sph+sphPad+'/'+cyl+cylPad+'x'+axis
}