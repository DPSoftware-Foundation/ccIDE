const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "production",
    target: "web",  // This should target the web environment for the renderer process
    entry: "./src/frontend.js", // Ensure this points to the correct renderer entry
    output: {
        filename: "renderer.js",
        path: path.resolve(__dirname, "dist"),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "src/index.html", // Ensure this injects the renderer script
        }),
    ],
};

