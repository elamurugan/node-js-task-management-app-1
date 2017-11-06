function requireModules(rootPath) {
    var fs = require('fs'),
        applyArgs = arguments;
    console.log(rootPath);

    fs.readdirSync(rootPath).forEach(function(file) {
        if (file.match(/.+\.js/g) !== null) {
            var module = require(rootPath + file);
            // module.apply(this, applyArgs);
            console.log(rootPath + file);
        }
    });
};

module.exports = requireModules;