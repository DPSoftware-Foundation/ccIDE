// this file not for generator only

const { luaGenerator } = require('blockly/lua');

// Check if luaGenerator.forBlock is defined and initialize if necessary
if (!luaGenerator.forBlock) {
    luaGenerator.forBlock = {};
}

// generator for Electric Motor

luaGenerator.forBlock['create_addition_electric_motor_set_speed'] = function(block, generator) {
    var motor = generator.valueToCode(block, 'MOTOR', generator.ORDER_ATOMIC);
    var speed = generator.valueToCode(block, 'RPM', generator.ORDER_ATOMIC);

    return `${motor}.setSpeed(${speed})\n`;
};

luaGenerator.forBlock['create_addition_electric_motor_stop'] = function(block, generator) {
    var motor = generator.valueToCode(block, 'MOTOR', generator.ORDER_ATOMIC);

    return `${motor}.stop()\n`;
};

luaGenerator.forBlock['create_addition_electric_motor_rotate'] = function(block, generator) {
    var motor = generator.valueToCode(block, 'MOTOR', generator.ORDER_ATOMIC);
    var degrees = generator.valueToCode(block, 'DEGREES', generator.ORDER_ATOMIC);
    var speed = generator.valueToCode(block, 'RPM', generator.ORDER_ATOMIC);

    if (speed == "nil") {
        return [`${motor}.rotate(${degrees})`, luaGenerator.ORDER_NONE];
    } else {
        return [`${motor}.rotate(${degrees}, ${speed})`, luaGenerator.ORDER_NONE];
    }
};

luaGenerator.forBlock['create_addition_electric_motor_translate'] = function(block, generator) {
    var motor = generator.valueToCode(block, 'MOTOR', generator.ORDER_ATOMIC);
    var tblock = generator.valueToCode(block, 'BLOCKS', generator.ORDER_ATOMIC);
    var speed = generator.valueToCode(block, 'RPM', generator.ORDER_ATOMIC);

    if (speed == "nil") {
        return [`${motor}.translate(${tblock})`, luaGenerator.ORDER_NONE];
    } else {
        return [`${motor}.translate(${tblock}, ${speed})`, luaGenerator.ORDER_NONE];
    }
};

luaGenerator.forBlock['create_addition_electric_motor_get_speed'] = function(block, generator) {
    var motor = generator.valueToCode(block, 'MOTOR', generator.ORDER_ATOMIC);

    return [`${motor}.getSpeed()`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['create_addition_electric_motor_get_stress_capacity'] = function(block, generator) {
    var motor = generator.valueToCode(block, 'MOTOR', generator.ORDER_ATOMIC);

    return [`${motor}.getStressCapacity()`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['create_addition_electric_motor_get_energy_consumption'] = function(block, generator) {
    var motor = generator.valueToCode(block, 'MOTOR', generator.ORDER_ATOMIC);

    return [`${motor}.getEnergyConsumption()`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['create_addition_electric_motor_get_max_input'] = function(block, generator) {
    var motor = generator.valueToCode(block, 'MOTOR', generator.ORDER_ATOMIC);

    return [`${motor}.getMaxInsert()`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['create_addition_electric_motor_get_max_output'] = function(block, generator) {
    var motor = generator.valueToCode(block, 'MOTOR', generator.ORDER_ATOMIC);

    return [`${motor}.getMaxExtract()`, luaGenerator.ORDER_NONE];
};

// generator for Accumulator

luaGenerator.forBlock['create_addition_accumulator_get_energy'] = function(block, generator) {
    var accumulator = generator.valueToCode(block, 'ACCUMULATOR', generator.ORDER_ATOMIC);

    return [`${accumulator}.getEnergy()`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['create_addition_accumulator_get_capacity'] = function(block, generator) {
    var accumulator = generator.valueToCode(block, 'ACCUMULATOR', generator.ORDER_ATOMIC);

    return [`${accumulator}.getCapacity()`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['create_addition_accumulator_get_percent'] = function(block, generator) {
    var accumulator = generator.valueToCode(block, 'ACCUMULATOR', generator.ORDER_ATOMIC);

    return [`${accumulator}.getPercent()`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['create_addition_accumulator_get_max_input'] = function(block, generator) {
    var accumulator = generator.valueToCode(block, 'ACCUMULATOR', generator.ORDER_ATOMIC);

    return [`${accumulator}.getMaxInsert()`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['create_addition_accumulator_get_max_output'] = function(block, generator) {
    var accumulator = generator.valueToCode(block, 'ACCUMULATOR', generator.ORDER_ATOMIC);

    return [`${accumulator}.getMaxExtract()`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['create_addition_accumulator_get_height'] = function(block, generator) {
    var accumulator = generator.valueToCode(block, 'ACCUMULATOR', generator.ORDER_ATOMIC);

    return [`${accumulator}.getHeight()`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['create_addition_accumulator_get_width'] = function(block, generator) {
    var accumulator = generator.valueToCode(block, 'ACCUMULATOR', generator.ORDER_ATOMIC);

    return [`${accumulator}.getWidth()`, luaGenerator.ORDER_NONE];
};

// generator for Portable Energy Interface (PEI)

luaGenerator.forBlock['create_addition_pei_get_energy'] = function(block, generator) {
    var pei = generator.valueToCode(block, 'PEI', generator.ORDER_ATOMIC);

    return [`${pei}.getEnergy()`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['create_addition_pei_get_capacity'] = function(block, generator) {
    var pei = generator.valueToCode(block, 'PEI', generator.ORDER_ATOMIC);

    return [`${pei}.getCapacity()`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['create_addition_pei_is_connected'] = function(block, generator) {
    var pei = generator.valueToCode(block, 'PEI', generator.ORDER_ATOMIC);

    return [`${pei}.isConnected()`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['create_addition_pei_get_max_input'] = function(block, generator) {
    var pei = generator.valueToCode(block, 'PEI', generator.ORDER_ATOMIC);

    return [`${pei}.getMaxInsert()`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['create_addition_pei_get_max_output'] = function(block, generator) {
    var pei = generator.valueToCode(block, 'PEI', generator.ORDER_ATOMIC);

    return [`${pei}.getMaxExtract()`, luaGenerator.ORDER_NONE];
};

// generator for Redstone Relay

luaGenerator.forBlock['create_addition_relay_get_max_input'] = function(block, generator) {
    var relay = generator.valueToCode(block, 'RELAY', generator.ORDER_ATOMIC);

    return [`${relay}.getMaxInsert()`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['create_addition_relay_get_max_output'] = function(block, generator) {
    var relay = generator.valueToCode(block, 'RELAY', generator.ORDER_ATOMIC);

    return [`${relay}.getMaxExtract()`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['create_addition_relay_get_throughput'] = function(block, generator) {
    var relay = generator.valueToCode(block, 'RELAY', generator.ORDER_ATOMIC);

    return [`${relay}.getThroughput()`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['create_addition_relay_is_powered'] = function(block, generator) {
    var relay = generator.valueToCode(block, 'RELAY', generator.ORDER_ATOMIC);

    return [`${relay}.isPowered()`, luaGenerator.ORDER_NONE];
};

// Digital Adapter | Rotational Speed Controller

luaGenerator.forBlock['create_addition_da_rotational_speed_control_set_target_speed'] = function(block, generator) {
    var speed = generator.valueToCode(block, 'RPM', generator.ORDER_ATOMIC);
    var adapter = generator.valueToCode(block, 'DA', generator.ORDER_ATOMIC);
    var side = block.getFieldValue('SIDE');

    return `${adapter}.setTargetSpeed("${side}", ${speed})\n`;
};

luaGenerator.forBlock['create_addition_da_rotational_speed_control_get_target_speed'] = function(block, generator) {
    var adapter = generator.valueToCode(block, 'DA', generator.ORDER_ATOMIC);
    var side = block.getFieldValue('SIDE');

    return [`${adapter}.getTargetSpeed("${side}")`, luaGenerator.ORDER_NONE];
};

// Digital Adapter | Stressometer

luaGenerator.forBlock['create_addition_da_stressometer_get_kinetic_stress'] = function(block, generator) {
    var adapter = generator.valueToCode(block, 'DA', generator.ORDER_ATOMIC);
    var side = block.getFieldValue('SIDE');

    return [`${adapter}.getKineticStress("${side}")`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['create_addition_da_stressometer_get_kinetic_capacity'] = function(block, generator) {
    var adapter = generator.valueToCode(block, 'DA', generator.ORDER_ATOMIC);
    var side = block.getFieldValue('SIDE');

    return [`${adapter}.getKineticSpeed("${side}")`, luaGenerator.ORDER_NONE];
};

// Digital Adapter | Speedometer

luaGenerator.forBlock['create_addition_da_speedometer_get_kinetic_speed'] = function(block, generator) {
    var adapter = generator.valueToCode(block, 'DA', generator.ORDER_ATOMIC);
    var side = block.getFieldValue('SIDE');

    return [`${adapter}.getKineticSpeed("${side}")`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['create_addition_da_speedometer_get_kinetic_max_speed'] = function(block, generator) {
    var adapter = generator.valueToCode(block, 'DA', generator.ORDER_ATOMIC);

    return [`${adapter}.getKineticTopSpeed()`, luaGenerator.ORDER_NONE];
};

// Digital Adapter | Pulleys

luaGenerator.forBlock['create_addition_da_pulleys_get_pulleys_distance'] = function(block, generator) {
    var adapter = generator.valueToCode(block, 'DA', generator.ORDER_ATOMIC);
    var side = block.getFieldValue('SIDE');

    return [`${adapter}.getPulleyDistance("${side}")`, luaGenerator.ORDER_NONE];
};

// Digital Adapter | Elevator Pulley

luaGenerator.forBlock['create_addition_da_elevator_pulley_get_elevator_floor'] = function(block, generator) {
    var adapter = generator.valueToCode(block, 'DA', generator.ORDER_ATOMIC);
    var side = block.getFieldValue('SIDE');

    return [`${adapter}.getElevatorFloor("${side}")`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['create_addition_da_elevator_pulley_get_elevator_floors'] = function(block, generator) {
    var adapter = generator.valueToCode(block, 'DA', generator.ORDER_ATOMIC);
    var side = block.getFieldValue('SIDE');

    return [`${adapter}.getElevatorFloors("${side}")`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['create_addition_da_elevator_pulley_get_elevator_floor_name'] = function(block, generator) {
    var floorindex = generator.valueToCode(block, 'INDEX', generator.ORDER_ATOMIC);
    var adapter = generator.valueToCode(block, 'DA', generator.ORDER_ATOMIC);
    var side = block.getFieldValue('SIDE');

    return [`${adapter}.getElevatorFloorName("${side}", ${floorindex})`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['create_addition_da_elevator_pulley_goto_elevator_floor_name'] = function(block, generator) {
    var floorindex = generator.valueToCode(block, 'INDEX', generator.ORDER_ATOMIC);
    var adapter = generator.valueToCode(block, 'DA', generator.ORDER_ATOMIC);
    var side = block.getFieldValue('SIDE');

    if (block.outputConnection && block.outputConnection.targetConnection) {
        return [`${adapter}.gotoElevatorFloor("${side}", ${floorindex})`, luaGenerator.ORDER_NONE];
    } else {
        return `${adapter}.gotoElevatorFloor("${side}", ${floorindex})\n`;
    }
};

// Digital Adapter | Mechanical Piston

luaGenerator.forBlock['create_addition_da_mechanical_piston_get_piston_distance'] = function(block, generator) {
    var adapter = generator.valueToCode(block, 'DA', generator.ORDER_ATOMIC);
    var side = block.getFieldValue('SIDE');

    return [`${adapter}.getPistonDistance("${side}")`, luaGenerator.ORDER_NONE];
};

// Digital Adapter | Mechanical Bearing

luaGenerator.forBlock['create_addition_da_mechanical_bearing_get_bearing_angle'] = function(block, generator) {
    var adapter = generator.valueToCode(block, 'DA', generator.ORDER_ATOMIC);
    var side = block.getFieldValue('SIDE');

    return [`${adapter}.getBearingAngle("${side}")`, luaGenerator.ORDER_NONE];
};

// Digital Adapter | Display Link

luaGenerator.forBlock['create_addition_da_dp_link_print'] = function(block, generator) {
    var text = generator.valueToCode(block, 'TEXT', generator.ORDER_ATOMIC);
    var adapter = generator.valueToCode(block, 'DA', generator.ORDER_ATOMIC);

    return `${adapter}.print("${text}")\n`;
};

luaGenerator.forBlock['create_addition_da_dp_link_clear_line'] = function(block, generator) {
    var adapter = generator.valueToCode(block, 'DA', generator.ORDER_ATOMIC);

    return `${adapter}.clearLine()\n`;
};

luaGenerator.forBlock['create_addition_da_dp_link_clear'] = function(block, generator) {
    var adapter = generator.valueToCode(block, 'DA', generator.ORDER_ATOMIC);

    return `${adapter}.clear()\n`;
};

luaGenerator.forBlock['create_addition_da_dp_link_get_line'] = function(block, generator) {
    var adapter = generator.valueToCode(block, 'DA', generator.ORDER_ATOMIC);

    return [`${adapter}.getLine()`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['create_addition_da_dp_link_set_line'] = function(block, generator) {
    var line = generator.valueToCode(block, 'LINE', generator.ORDER_ATOMIC);
    var adapter = generator.valueToCode(block, 'DA', generator.ORDER_ATOMIC);

    return `${adapter}.setLine()\n`;
};

luaGenerator.forBlock['create_addition_da_dp_link_get_max_line'] = function(block, generator) {
    var adapter = generator.valueToCode(block, 'DA', generator.ORDER_ATOMIC);

    return [`${adapter}.getMaxLines()`, luaGenerator.ORDER_NONE];
};