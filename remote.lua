local ws = assert(http.websocket("ws://127.0.0.1:5133"))
print("connected to server")

local id

while true do
    print("ready")
    local message, error = ws.receive()
    if message then
        print("Received message:", message)
        if message == "ping" then
            ws.send("pong")
        elseif message == "sendcode" then
            local file = io.open("main.lua", "w")
            print("waiting for code")
            local filedata, error = ws.receive()
            file:write(filedata)
            file:close()
        elseif message == "runcode" then
            shell.run("main")
        elseif message == "exit" then
            print("Exiting...")
            break
        end

    else
        print("WebSocket error:", error)
        break
    end
end

ws.close()
