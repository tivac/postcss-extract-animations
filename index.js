"use strict";

var postcss = require("postcss"),
    slug    = require("unique-slug");

module.exports = postcss.plugin(require("./package.json").name, () =>
    (root) => {
        // PostCSS doesn't see it as a decl like you'd expect, so use
        // .walkRules with a very peculiar-looking filter regex
        root.walkRules(/^animation:.*@keyframes$/i, (rule) => {
            var anim, decl, name;
            
            // TODO: real name generation
            name = `anim-${slug(rule.parent.selector)}`;
            
            anim = rule.clone({
                type   : "atrule",
                name   : "keyframes",
                params : name
            });

            decl = rule.clone({
                type  : "decl",
                prop  : "animation",
                value : rule.selector
                    .replace(/^animation:\s*/, "")
                    .replace(/@keyframes\s*/, name)
            });

            delete anim.selector;
            
            rule.parent.parent.insertBefore(rule.parent, anim);
            
            // Replace source rule w/ animation decl
            rule.replaceWith(decl);
        });
    }
);
