module.exports = function (cmsKey, options) {
    var opts = options.hash;
    cmsKey = 'cms:' + cmsKey;
    var result = i18n.t(cmsKey, opts);
    return new Handlebars.SafeString(result);
};
