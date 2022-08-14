// Update document version
module.exports.updateVersion = async function (version) {
    try {
        // Covert Hex to number and then increment by 1 and conver it back to hex
        let newVersion = (parseInt(version, 16) + 1).toString(16);

        // Add preceding zeros
        if (newVersion.length == 1)
            return `00${newVersion}`
        else if (newVersion.length == 2)
            return `0${newVersion}`
        else
            return JSON.parse(JSON.stringify(newVersion))
    
    } catch (err) {
      throw err
    }
}