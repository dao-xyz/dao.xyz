/* const {
    override,
    addBabelPlugins,
    addExternalBabelPlugins,
    addWebpackPlugin,
} = require('customize-cra');
const { DefinePlugin } = require('webpack');
 */

module.exports = function override(config, env) {
    let loaders = config.resolve
    loaders.fallback = {
        "crypto": require.resolve("crypto-browserify"),
        "stream": require.resolve("stream-browserify"),
        "path": require.resolve("path-browserify"),
        "buffer": require.resolve("buffer"),
        "timers": require.resolve('timers-browserify'),
        "url": require.resolve('url'),
        "child_process": false,
        "fs": false,
        "assert": false

    }
    config.module.rules = [...config.module.rules,
    {
        test: /\.m?js/,
        resolve: {
            fullySpecified: false
        }
    }
    ]
    /* config.plugins.push(new webpack.DefinePlugin({
        process: { env: {} }
    })) */
    /*  addWebpackPlugin(
         new DefinePlugin({
             process: { env: {} }
         }),
     ) */

    /*  config.plugins.push(new webpack.ProvidePlugin({
         Buffer: ['buffer', 'Buffer'],
     }))
 
     */

    return config
}