print("checking computer type...")
local machineType = 0
local isAdvanced = false
local isPocket = false
local isTurtle = false
local isCommand = false

-- Check if advanced (multishell exists in advanced computers and advanced pocket computers)
if multishell then
    isAdvanced = true
end

-- Check if Pocket Computer (API specific to Pocket Computers)
if pocket then
    isPocket = true
end

-- Check if Turtle (turtle API is available for turtles)
if turtle then
    isTurtle = true
end

if commands then
    isCommand = true
end

-- Determine machine type
if isTurtle then
    if isAdvanced then
        machineType = 3 -- Advanced Turtle
    else
        machineType = 1 -- Standard Turtle
    end
elseif isPocket then
    if isAdvanced then
        machineType = 4 -- Advanced Pocket Computer
    else
        machineType = 2 -- Standard Pocket Computer
    end
else
    if isAdvanced then
        if isCommand then
            machineType = 7 -- Command Computer
        else
            machineType = 6 -- Advanced Computer
        end
        
    else
        machineType = 5 -- Standard Computer
    end
end

print("Machine Type: " .. machineType)
print("connecting to IDE...")
local ws = assert(http.websocket("ws://127.0.0.1:5133"))
print("connected to server")

local id
local isrunning = true

function exitcheck()
    while true do
        local event = os.pullEventRaw("terminate")
        if event == "terminate" then
            print("Exiting...")
            isrunning = false
            ws.close()
            break
        end
    end
end

function main()
    while isrunning do
        print("ready")
        local message, error = ws.receive()
        if message then
            print("Received message:", message)
            if message == "ping" then
                ws.send("pong")
            elseif message == "info" then
                info = {
                    OSVersion = os.version(),
                    ID = os.getComputerID(),
                    Name = os.getComputerLabel() or "No Name",
                    Type = machineType,
                    uptime = os.clock()
                }
                ws.send(textutils.serialiseJSON(info))
            elseif message == "sendcode" then
                local file = io.open("main.lua", "w")
                print("waiting for code")
                local filedata, error = ws.receive()
                file:write(filedata)
                file:close()
            elseif message == "runcode" then
                if isAdvanced then
                    id = multishell.launch({}, "main.lua")
                    multishell.setTitle(id, "Code")
                    multishell.setFocus(id)
                else
                    shell.run("main")
                end
            elseif message == "exit" then
                print("Exiting...")
                break
            end

        else
            print("WebSocket error:", error)
            break
        end
    end
end

parallel.waitForAny(exitcheck, main)
print("Exited")