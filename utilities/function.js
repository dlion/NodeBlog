var crypto = require('crypto');
//
// Some usefull functions
//

//
// Check if there is an element in an array
//


exports.inArray = function(archive, element) {
    for(i=0; i < archive.length; i++) {
        if(archive[i] == element)
            return true;
    }

    return false;
};


//
// Crypt String using sha1
// 

exports.cryptSha1 = function(stringa) {
    if(stringa.length > 0) {
        var shasum = crypto.createHash('sha1');
        shasum.update(stringa);
        return shasum.digest('hex');
    }
    else {
        return null;
    }
};
    
