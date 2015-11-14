'use strict';

var profileManager = {
    profile: '',

    selector: function(args) {
        if (args.options.prod === true) {
            this.profile = 'prod';
            return this.profile;

        } else {
            this.profile = 'default';
            return this.profile;
        }
    }
};

module.exports = profileManager;
