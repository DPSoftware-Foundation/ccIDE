// this file not for generator only

const { luaGenerator } = require('blockly/lua');

// Check if luaGenerator.forBlock is defined and initialize if necessary
if (!luaGenerator.forBlock) {
    luaGenerator.forBlock = {};
}

luaGenerator.forBlock['disk_is_present'] = function(block, generator) {
    var side = block.getFieldValue('SIDE');
    
    return [`disk.isPresent("${side}")`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['disk_get_label'] = function(block, generator) {
    var side = block.getFieldValue('SIDE');
    
    return [`disk.getLabel("${side}")`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['disk_set_label'] = function(block, generator) {
    var side = block.getFieldValue('SIDE');
    var label = generator.valueToCode(block, 'LABEL', generator.ORDER_ATOMIC);
    
    return `disk.setLabel("${side}", ${label})\n`;
};

luaGenerator.forBlock['disk_has_data'] = function(block, generator) {
    var side = block.getFieldValue('SIDE');
    
    return [`disk.hasData("${side}")`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['disk_get_mount_path'] = function(block, generator) {
    var side = block.getFieldValue('SIDE');
    
    return [`disk.getMountPath("${side}")`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['disk_has_audio'] = function(block, generator) {
    var side = block.getFieldValue('SIDE');
    
    return [`disk.hasAudio("${side}")`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['disk_get_audio_title'] = function(block, generator) {
    var side = block.getFieldValue('SIDE');
    
    return [`disk.getAudioTitle("${side}")`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['disk_play_audio'] = function(block, generator) {
    var side = block.getFieldValue('SIDE');
    
    return `disk.playAudio("${side}")\n`;
};

luaGenerator.forBlock['disk_stop_audio'] = function(block, generator) {
    var side = block.getFieldValue('SIDE');
    
    return `disk.stopAudio("${side}")\n`;
};

luaGenerator.forBlock['disk_eject'] = function(block, generator) {
    var side = block.getFieldValue('SIDE');
    
    return `disk.eject("${side}")\n`;
};

luaGenerator.forBlock['disk_get_id'] = function(block, generator) {
    var side = block.getFieldValue('SIDE');
    
    return [`disk.getID("${side}")`, luaGenerator.ORDER_NONE];
};