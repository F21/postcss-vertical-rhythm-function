var postcss = require('postcss');
var reduceFunctionCall = require('reduce-function-call');

module.exports = postcss.plugin('postcss-vertical-rhythm-function', function (opts) {
    opts = opts || {};

    var rootSelector = opts.rootSelector || 'body';

    return function (css) {

        var lineHeight = null;

        css.walkDecls(function transformDecl(decl) {

            // Check for root font-size.
            if (decl.parent.selector === rootSelector) {

                if (decl.prop === 'font') {

                    // Matches {$1:font-size}{$2:unit}/{$3:line-height}.
                    var rule = /(\d+|\d+?\.\d+)(r?em|px|%)(?:\s*\/\s*)(\d+|\d+?\.\d+)\s+/;

                    var fontProps = decl.value.match(rule);

                    // Make sure font delcaration is valid.
                    if (!fontProps) {
                        throw decl.error('Font declaration is invalid.');
                    }

                    lineHeight = fontProps[3];

                } else if (decl.prop === 'line-height') {

                    // Matches {$1:line-height}.
                    var lhProps = decl.value.match(/(^[0-9\.]*$)/);

                    // Make sure line-height delcaration is valid.
                    if (!lhProps) {
                        throw decl.error('Line-height declaration is invalid.');
                    }

                    lineHeight = lhProps[1];

                }
            }
        });

        css.walkDecls(function (decl) {
            if (!decl.value || decl.value.indexOf('vr(') === -1) {
                return;
            }

            decl.value = reduceFunctionCall(decl.value, 'vr', function (body) {
                return lineHeight * parseFloat(body);
            });
        });
    };
});
