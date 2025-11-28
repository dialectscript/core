// ajami_mode.js
ace.define('ace/mode/ajami', ['require', 'exports', 'ace/lib/oop', 'ace/mode/text', 'ace/mode/ajami_highlight_rules'], function(require, exports) {
    var oop = require('ace/lib/oop');
    var TextMode = require('ace/mode/text').Mode;
    var AjamiHighlightRules = require('ace/mode/ajami_highlight_rules').AjamiHighlightRules;

    var Mode = function() {
        this.HighlightRules = AjamiHighlightRules;
        this.$behaviour = this.$defaultBehaviour;
    };
    oop.inherits(Mode, TextMode);

    (function() {
        // Optional: Define additional behaviors or fold styles
        this.$id = "ace/mode/ajami";
    }).call(Mode.prototype);

    exports.Mode = Mode;
});
