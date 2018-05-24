module.exports = function (i18nKey, options) {
    var opts = options.hash;

    if (opts.bundle) {
        i18nKey = opts.bundle + ':' + i18nKey;
    }
    var result = i18n.t(i18nKey, opts);

    if (i18n.options.lng == 'zz') {
        var replaceChar = 'z';
        if (result !== i18nKey) {
            result = result.replace(/[a-z]/g, replaceChar).replace(/[A-Z]/g,replaceChar.toUpperCase());
        }
    }

    return new Handlebars.SafeString(result);
};
