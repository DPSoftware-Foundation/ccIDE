const { luaGenerator } = require('blockly/lua');

// Check if luaGenerator.forBlock is defined and initialize if necessary
if (!luaGenerator.forBlock) {
    luaGenerator.forBlock = {};
}

luaGenerator.forBlock['turtle_move_operation'] = function(block, generator) {
    var operator = block.getFieldValue('OPERATION');
    var FOR = generator.valueToCode(block, 'FOR', generator.ORDER_ATOMIC);

    var movecommand = '';
    switch (operator) {
        case 'FORWARD':
            movecommand = 'turtle.forward()';
            break;
        case 'BACK':
            movecommand = 'turtle.back()';
            break;
        case 'UP':
            movecommand = 'turtle.up()';
            break;
        case 'DOWN':
            movecommand = 'turtle.down()';
            break;
        default:
            movecommand = 'turtle.forward()';
            break;
    }
    if (FOR == 1) {
        var code = movecommand;
    } else {
        var code = `for i=${FOR},1,-1 do ${movecommand} end`;
    };

    return code + "\n";
};

luaGenerator.forBlock['turtle_turn_operation'] = function(block, generator) {
    var operator = block.getFieldValue('OPERATION');
    var FOR = generator.valueToCode(block, 'ROUND', generator.ORDER_ATOMIC);

    var movecommand = '';
    switch (operator) {
        case 'LEFT':
            movecommand = 'turtle.turnLeft()';
            break;
        case 'RIGHT':
            movecommand = 'turtle.turnRight()';
            break;
        default:
            movecommand = 'turtle.turnLeft()';
            break;
    }
    if (FOR == 1) {
        var code = movecommand;
    } else {
        var code = `for i=${FOR},1,-1 do ${movecommand} end`;
    };
    
    return code + "\n";
};

luaGenerator.forBlock['turtle_turn_operation'] = function(block, generator) {
    var operator = block.getFieldValue('OPERATION');
    var FOR = generator.valueToCode(block, 'ROUND', generator.ORDER_ATOMIC);

    var movecommand = '';
    switch (operator) {
        case 'LEFT':
            movecommand = 'turtle.turnLeft()';
            break;
        case 'RIGHT':
            movecommand = 'turtle.turnRight()';
            break;
        default:
            movecommand = 'turtle.turnLeft()';
            break;
    }
    if (FOR == 1) {
        var code = movecommand;
    } else {
        var code = `for i=${FOR},1,-1 do ${movecommand} end`;
    };
    
    return code + "\n";
};

luaGenerator.forBlock['turtle_dig_operation'] = function(block, generator) {
    var operator = block.getFieldValue('OPERATION');
    var side = block.getFieldValue('SIDE');

    var code = '';
    switch (operator) {
        case 'FRONT':
            code = `turtle.dig("${side}")`;
            break;
        case 'UP':
            code = `turtle.digUp("${side}")`;
            break;
        case 'DOWN':
            code = `turtle.digDown("${side}")`;
            break;
        default:
            code = `turtle.dig("${side}")`;
            break;
    }
    
    return code + "\n";
};

luaGenerator.forBlock['turtle_attack_operation'] = function(block, generator) {
    var operator = block.getFieldValue('OPERATION');
    var side = block.getFieldValue('SIDE');

    var code = '';
    switch (operator) {
        case 'FRONT':
            code = `turtle.attack("${side}")`;
            break;
        case 'UP':
            code = `turtle.attackUp("${side}")`;
            break;
        case 'DOWN':
            code = `turtle.attackDown("${side}")`;
            break;
        default:
            code = `turtle.attack("${side}")`;
            break;
    }
    
    return code + "\n";
};

luaGenerator.forBlock['turtle_place_operation'] = function(block, generator) {
    var operator = block.getFieldValue('OPERATION');

    var code = '';
    switch (operator) {
        case 'FRONT':
            code = `turtle.place()`;
            break;
        case 'UP':
            code = `turtle.placeUp()`;
            break;
        case 'DOWN':
            code = `turtle.placeDown()`;
            break;
        default:
            code = `turtle.place()`;
            break;
    }
    
    return code + "\n";
};

luaGenerator.forBlock['turtle_drop_operation'] = function(block, generator) {
    var operator = block.getFieldValue('OPERATION');
    var count = generator.valueToCode(block, 'COUNT', generator.ORDER_ATOMIC);

    var code = '';
    switch (operator) {
        case 'FRONT':
            code = `turtle.drop(${count})`;
            break;
        case 'UP':
            code = `turtle.dropUp(${count})`;
            break;
        case 'DOWN':
            code = `turtle.dropDown(${count})`;
            break;
        default:
            code = `turtle.drop(${count})`;
            break;
    }
    
    return code + "\n";
};

luaGenerator.forBlock['turtle_select_item'] = function(block, generator) {
    var slot = generator.valueToCode(block, 'SLOT', generator.ORDER_ATOMIC);

    return `turtle.select(${slot})\n`;
};

luaGenerator.forBlock['turtle_get_item_count'] = function(block, generator) {
    var slot = generator.valueToCode(block, 'SLOT', generator.ORDER_ATOMIC);

    return [`turtle.getItemCount(${slot})`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['turtle_get_slot_free'] = function(block, generator) {
    var slot = generator.valueToCode(block, 'SLOT', generator.ORDER_ATOMIC);

    return [`turtle.getItemSpace(${slot})`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['turtle_detect_block'] = function(block, generator) {
    var operator = block.getFieldValue('OPERATION');

    var code = '';
    switch (operator) {
        case 'FRONT':
            code = `turtle.detect()`;
            break;
        case 'UP':
            code = `turtle.detectUp()`;
            break;
        case 'DOWN':
            code = `turtle.detectDown()`;
            break;
        default:
            code = `turtle.detect()`;
            break;
    }
    
    return [code, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['turtle_compare_item'] = function(block, generator) {
    var operator = block.getFieldValue('OPERATION');

    var code = '';
    switch (operator) {
        case 'FRONT':
            code = `turtle.compare()`;
            break;
        case 'UP':
            code = `turtle.compareUp()`;
            break;
        case 'DOWN':
            code = `turtle.compareDown()`;
            break;
        default:
            code = `turtle.compare()`;
            break;
    }
    
    return [code, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['turtle_collect_item'] = function(block, generator) {
    var count = generator.valueToCode(block, 'COUNT', generator.ORDER_ATOMIC);
    var operator = block.getFieldValue('OPERATION');

    var code = '';
    switch (operator) {
        case 'FRONT':
            code = `turtle.suck(${count})`;
            break;
        case 'UP':
            code = `turtle.suckUp(${count})`;
            break;
        case 'DOWN':
            code = `turtle.suckDown(${count})`;
            break;
        default:
            code = `turtle.suck(${count})`;
            break;
    }
    
    return code + "\n";
};

luaGenerator.forBlock['turtle_get_fuel_level'] = function(block) {
    return ["turtle.getFuelLevel()", luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['turtle_refuel'] = function(block, generator) {
    var count = generator.valueToCode(block, 'COUNT', generator.ORDER_ATOMIC);

    if (count == 0) {
        var code = "turtle.refuel()"
    } else {
        var code = `turtle.refuel(${count})`
    }

    return code + "\n";
};

luaGenerator.forBlock['turtle_compare_to'] = function(block, generator) {
    var slot = generator.valueToCode(block, 'SLOT', generator.ORDER_ATOMIC);

    return [`turtle.compareTo(${slot})`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['turtle_transfer_to'] = function(block, generator) {
    var slot = generator.valueToCode(block, 'SLOT', generator.ORDER_ATOMIC);
    var count = generator.valueToCode(block, 'COUNT', generator.ORDER_ATOMIC);

    return `turtle.transferTo(${slot}, ${count})\n`;
};

luaGenerator.forBlock['turtle_get_selected_slot'] = function(block) {
    return [`turtle.getSelectedSlot()`, luaGenerator.ORDER_NONE];
};


luaGenerator.forBlock['turtle_get_fuel_limit'] = function(block) {
    return [`turtle.getFuelLimit()`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['turtle_equip'] = function(block) {
    var side = block.getFieldValue('SIDE');

    var code = '';
    switch (side) {
        case 'LEFT':
            code = `turtle.equipLeft()`;
            break;
        case 'RIGHT':
            code = `turtle.equipRight()	`;
            break;
        default:
            code = `turtle.equipLeft()`;
            break;
    }

    return [code, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['turtle_inspect'] = function(block) {
    var operator = block.getFieldValue('OPERATION');

    var code = '';
    switch (operator) {
        case 'FRONT':
            code = `turtle.inspect()`;
            break;
        case 'UP':
            code = `turtle.inspectUp()`;
            break;
        case 'DOWN':
            code = `turtle.inspectDown()`;
            break;
        default:
            code = `turtle.inspect()`;
            break;
    }
    
    return [code, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['turtle_get_item_detail'] = function(block, generator) {
    var slot = generator.valueToCode(block, 'SLOT', generator.ORDER_ATOMIC);

    return [`turtle.getItemDetail(${slot})`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['turtle_craft'] = function(block, generator) {
    var limit = generator.valueToCode(block, 'LIMIT', generator.ORDER_ATOMIC);

    return `turtle.craft(${limit})\n`;
};