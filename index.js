'use strict';

var fs = require('co-fs');
var path = require('path');


console.log('testing');

var jsonfile = function (settings) {

    settings.root = path.resolve(process.cwd(), settings.root || 'json_data')

    function jsonfile() {
        this.config = {};
    }

    jsonfile.read = function *(file) {

        var data = yield fs.readFile(`${settings.root}/${file}`);

        var obj = {};
        try {
            obj = JSON.parse(data);
        }catch (err) {
            err.message = `${file}: ${err.message}`;
        }

        return data;
    }

    jsonfile.write = function *(file, obj) {

        var exists = yield fs.exists(settings.root);

        if (!exists) {
            var mkdir = yield fs.mkdir(settings.root);
            console.log(mkdir);
        }

        var str = '';
        try {
            str = JSON.stringify(obj, null, 2) + '\n';
        }catch (err) {
            return err;
        }

        yield fs.writeFile(`${settings.root}/${file}`, str);

        return 'jsonfile.write return';
    }

    return jsonfile;
}



module.exports = jsonfile;
