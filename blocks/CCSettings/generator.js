const { luaGenerator } = require('blockly/lua');

// Check if luaGenerator.forBlock is defined and initialize if necessary
if (!luaGenerator.forBlock) {
    luaGenerator.forBlock = {};
}

function exportWithEquals(obj) {
    let result = [];
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            result.push(`${key}=${obj[key]}`);
        }
    }
    return `{${result.join(',')}}`;
}

luaGenerator.forBlock['settings_define'] = function(block, generator) {
    var name = generator.valueToCode(block, 'NAME', generator.ORDER_NONE);
    var desc = generator.valueToCode(block, 'DESC', generator.ORDER_NONE);
    var def = generator.valueToCode(block, 'DEF', generator.ORDER_NONE);
    var type = generator.valueToCode(block, 'TYPE', generator.ORDER_NONE);

    var option = {}

    if (desc != "") {
        option.description = desc
    }
    if (def != "") {
        option.default = def
    }
    if (type != "") {
        option.type = type
    }
    var exportedoption = exportWithEquals(option);

    if (exportedoption == "{}") {
        var code = `settings.define(${name})`
    } else {
        var code = `settings.define(${name}, ${exportedoption})`
    }

    return code + "\n";
};

luaGenerator.forBlock['settings_undefine'] = function(block, generator) {
    var name = generator.valueToCode(block, 'NAME', generator.ORDER_NONE);

    return `settings.undefine(${name})`;
};

luaGenerator.forBlock['settings_set'] = function(block, generator) {
    var name = generator.valueToCode(block, 'NAME', generator.ORDER_NONE);
    var value = generator.valueToCode(block, 'VALUE', generator.ORDER_NONE);

    return `settings.set(${name}, ${value})`;
};

luaGenerator.forBlock['settings_get'] = function(block, generator) {
    var name = generator.valueToCode(block, 'NAME', generator.ORDER_NONE);

    return [`settings.get(${name})`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['settings_getdetails'] = function(block, generator) {
    var name = generator.valueToCode(block, 'NAME', generator.ORDER_NONE);

    return [`settings.getDetails(${name})`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['settings_unset'] = function(block, generator) {
    var name = generator.valueToCode(block, 'NAME', generator.ORDER_NONE);

    return `settings.unset(${name})`;
};

luaGenerator.forBlock['settings_clear'] = function(block, generator) {
    return `settings.clear()`;
};

luaGenerator.forBlock['settings_getnames'] = function(block, generator) {
    return [`settings.getNames()`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['settings_load'] = function(block, generator) {
    var file = generator.valueToCode(block, 'FILE', generator.ORDER_NONE);

    return `settings.load(${file})`;
};

luaGenerator.forBlock['settings_save'] = function(block, generator) {
    var file = generator.valueToCode(block, 'FILE', generator.ORDER_NONE);

    return `settings.save(${file})`;
};
