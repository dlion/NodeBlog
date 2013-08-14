//
// Some usefull functions
//

exports.inArray = function(archive, element) {
    for(i=0; i < archive.length; i++) {
        if(archive[i] == element)
            return true;
    }

    return false;
};

