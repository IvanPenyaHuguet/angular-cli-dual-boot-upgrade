import { CustomWebpackBrowserSchema, TargetOptions } from '@angular-builders/custom-webpack';
import * as webpack from 'webpack';
import path from 'path';
import fs from 'fs';
import semver from 'semver';
const packageJson = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../package.json'), 'utf8'));


export default (
    config: webpack.WebpackOptionsNormalized,
    options: CustomWebpackBrowserSchema,
    targetOptions: TargetOptions
) => {

    if (!semver.satisfies(process.version, packageJson.engines.node)) {
        console.log(
            `NodeJS Version Check: Required node version ${packageJson.engines.node} NOT SATISFIED with current version ${process.version}.`
        );
        process.exit(1);
    }

    // rules for angularjs support
    config.module.rules = config.module.rules.concat([
        {
            test: /\.html$/,
            exclude: [/node_modules/, /\.component\.html$/],
            use: [
                {
                    loader: 'html-loader',
                    options: {
                        sources: false,
                        minimize: false,
                        esModule: false
                    }
                }
            ]
        },
    ]);

    //deactivate mangling for Terser angular < 12
    config.optimization.minimizer?.filter (({constructor: {name}}) => name === 'TerserPlugin')
        .forEach ( (terser: any) => {
            terser.options.extractComments = false;
            terser.options.terserOptions.mangle = false;
        });
    //deactivate mangling JavascriptOptimizer angular >= 12
    config.optimization.minimizer?.filter (({constructor: {name}}) => name === 'JavaScriptOptimizerPlugin')
        .forEach ( (plugin: any) => {
            plugin.options.keepIdentifierNames = true;
            plugin.options.keepNames = true;
            plugin.options.removeLicenses = false;
        });

    config.plugins.push(
        new webpack.ProvidePlugin(providePluginConfig)
    );
    return config;
};

const providePluginConfig = {
    jQuery: 'jquery',
    'window.jQuery': 'jquery',
    $: 'jquery'
};
