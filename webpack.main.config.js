const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const nodeExternals = require("webpack-node-externals");

module.exports = {
    mode: "production",
    target: "electron-main", // For Electron main process
    entry: "./src/index.js", // Adjust based on your main entry file
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist"),
    },
    externals: [nodeExternals()], // Exclude node_modules
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { from: "assets", to: "assets" },
                { from: "blocks", to: "blocks" },
                { from: "src/styles.css", to: "styles.css" },
            ],
        }),
    ],
};
