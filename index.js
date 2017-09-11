"use strict";

var postcss = require("postcss"),
    slug    = require("unique-slug");

module.exports = postcss.plugin(require("./package.json").name, () =>
    (root) => {
        // PostCSS doesn't see it as a decl like you'd expect, so use
        // .walkRules with a very peculiar-looking filter regex
        root.walkRules(/^animation:.*@keyframes$/i, (rule) => {
            const parent = rule.parent;
            
            // TODO: real name generation
            const name = `anim-${slug(parent.selector)}`;
            
            const anim = rule.clone({
                type   : "atrule",
                name   : "keyframes",
                params : name,
                raws   : Object.assign({}, parent.raws)
            });

            const decl = postcss.decl({
                prop   : "animation",
                source : rule.source,
                value  : rule.selector
                    .replace(/^animation:\s*/, "")
                    .replace(/@keyframes\s*/, name)
            });

            // Insert animation
            root.insertBefore(parent, anim);
            
            // Replace source rule w/ animation decl
            rule.replaceWith(decl);

            // Try to clean up spacing for the rule we just modified
            delete parent.raws.before;
        });
    }
);
