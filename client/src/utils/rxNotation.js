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

    if (sph === null, cyl == null, axis === null) {
        return ''
    }

    let prefix = ""
    if (sph >= 0) {
        prefix = "+"
    }

    let sphPad = ""
    if (sph % 1 === 0) {
        sphPad = ".00"
    } else if (sph % 1 === 0.5) {
        sphPad = "0"
    }

    let cylPad = ""
    if (cyl % 1 === 0) {
        cylPad = ".00"
    } else if (cyl % 1 === 0.5) {
        cylPad = "0"
    }

    let cylPrefix = ""
    if (cyl===0) {
        cylPrefix="-"
    }

    return prefix+sph+sphPad+'/'+cylPrefix+cyl+cylPad+'x'+axis
}

export const rxNotationRegex = new RegExp(
    "[-+]\d+\.(00|25|50|75)\/-([1-9]\d*\.(00|25|50|75)x([1-9]{1,2}|1[0-7][0-9]|180)|0\.00x000|0\.(25|50|75)x([1-9]{1,2}|1[0-7][0-9]|180))$"
);
