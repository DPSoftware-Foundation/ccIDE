// this file not for generator only

const { luaGenerator } = require('blockly/lua');

// Check if luaGenerator.forBlock is defined and initialize if necessary
if (!luaGenerator.forBlock) {
    luaGenerator.forBlock = {};
}

luaGenerator.forBlock['sysos_pullevent'] = function(block, generator) {
    var event = generator.valueToCode(block, 'EVENT', generator.ORDER_ATOMIC);

    if (event == "") {
        return [`os.pullevent()`, luaGenerator.ORDER_NONE];
    } else {
        return [`os.pullevent(${event})`, luaGenerator.ORDER_NONE];
    }
};

luaGenerator.forBlock['sysos_pullrawevent'] = function(block, generator) {
    var event = generator.valueToCode(block, 'EVENT', generator.ORDER_ATOMIC);

    if (event == "") {
        return [`os.pullEventRaw()`, luaGenerator.ORDER_NONE];
    } else {
        return [`os.pullEventRaw(${event})`, luaGenerator.ORDER_NONE];
    }
};

luaGenerator.forBlock['sysos_version'] = function(block, generator) {
    return [`os.version()`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['sysos_run'] = function(block, generator) {
    var env = generator.valueToCode(block, 'ENV', generator.ORDER_ATOMIC) || "{}";
    var run = generator.valueToCode(block, 'RUN', generator.ORDER_ATOMIC);
    var args = generator.valueToCode(block, 'ARGS', generator.ORDER_ATOMIC);

    if (args == "") {
        return `os.run(${env}, ${run})\n`;
    } else {
        return `os.run(${env}, ${run}, ${args})\n`;
    }
};

luaGenerator.forBlock['sysos_queue_event'] = function(block, generator) {
    var event = generator.valueToCode(block, 'EVENT', generator.ORDER_ATOMIC);
    var args = generator.valueToCode(block, 'ARGS', generator.ORDER_ATOMIC);

    if (args == "") {
        return `os.queueEvent(${event})\n`;
    } else {
        return `os.queueEvent(${event}, ${args})\n`;
    }
};

luaGenerator.forBlock['sysos_start_timer'] = function(block, generator) {
    var time = generator.valueToCode(block, 'TIME', generator.ORDER_ATOMIC);

    return [`os.queueEvent(${time})`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['sysos_cancel_timer'] = function(block, generator) {
    var id = generator.valueToCode(block, 'ID', generator.ORDER_ATOMIC);

    return `os.cancelTimer(${id}\n`;
};

luaGenerator.forBlock['sysos_set_alarm'] = function(block, generator) {
    var time = generator.valueToCode(block, 'TIME', generator.ORDER_ATOMIC);

    return [`os.setAlarm(${time})`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['sysos_cancel_alarm'] = function(block, generator) {
    var id = generator.valueToCode(block, 'ID', generator.ORDER_ATOMIC);

    return `os.cancelAlarm(${id})\n`;
};

luaGenerator.forBlock['sysos_shutdown'] = function(block, generator) {
    return `os.shutdown()`
};

luaGenerator.forBlock['sysos_reboot'] = function(block, generator) {
    return `os.reboot()`
};

luaGenerator.forBlock['sysos_get_computer_id'] = function(block, generator) {
    return [`os.getComputerID()`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['sysos_get_computer_label'] = function(block, generator) {
    return [`os.getComputerLabel()`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['sysos_set_computer_label'] = function(block, generator) {
    var label = generator.valueToCode(block, 'LABEL', generator.ORDER_ATOMIC);

    return `os.setComputerLabel(${label})\n`;
};

luaGenerator.forBlock['sysos_clock'] = function(block, generator) {
    return [`os.clock()`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['sysos_time'] = function(block, generator) {
    var locate = block.getFieldValue('LOCATE');

    return [`os.time("${locate}")`, generator.ORDER_ATOMIC];
};

luaGenerator.forBlock['sysos_day'] = function(block, generator) {
    var locate = block.getFieldValue('LOCATE');

    return [`os.day("${locate}")`, generator.ORDER_ATOMIC];
};

luaGenerator.forBlock['sysos_epoch'] = function(block, generator) {
    var locate = block.getFieldValue('LOCATE');

    return [`os.epoch("${locate}")`, generator.ORDER_ATOMIC];
};

luaGenerator.forBlock['sysos_date'] = function(block, generator) {
    var format = generator.valueToCode(block, 'FORMAT', generator.ORDER_ATOMIC);
    var time = generator.valueToCode(block, 'TIME', generator.ORDER_ATOMIC);

    return [`os.date(${format}, ${time})`, luaGenerator.ORDER_NONE];
};