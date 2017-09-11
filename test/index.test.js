"use strict";

var dedent = require("dedent"),

    plugin = require("../index.js");

describe("postcss-extract-animations", () => {
    it("should extract animations from simple selectors", () =>
        plugin.process(dedent(`
            .a {
                animation: 1s @keyframes {
                    to {
                        opacity: 1;
                    }
                }
            }
        `))
        .then((result) => expect(result.css).toMatchSnapshot())
    );

    it("should extract animations from more complex selectors", () =>
        plugin.process(dedent(`
            .a .b > div > a[animate] {
                animation: 1s @keyframes {
                    to {
                        opacity: 1;
                    }
                }
            }
        `))
        .then((result) => expect(result.css).toMatchSnapshot())
    );

    it("should extract animations from more complex declarations", () =>
        plugin.process(dedent(`
            .a {
                animation: 1s ease-in 1s 2 reverse both paused @keyframes {
                    to {
                        opacity: 1;
                    }
                }
            }
        `))
        .then((result) => expect(result.css).toMatchSnapshot())
    );


    it("shouldn't touch declarations around the animation", () =>
        plugin.process(dedent(`
            .a {
                color: #FFF;
                animation: 1s @keyframes {
                    to {
                        opacity: 1;
                    }
                }
                background: red;
            }
        `))
        .then((result) => expect(result.css).toMatchSnapshot())
    );

    it("shouldn't touch normal animation decls", () =>
        plugin.process(dedent(`
            .a {
                animation: 1s reveal;
                animation: 1s @keyframes {
                    to {
                        opacity: 1;
                    }
                }
            }
        `))
        .then((result) => expect(result.css).toMatchSnapshot())
    );
});
