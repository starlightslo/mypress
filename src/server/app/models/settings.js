const ErrorMessage = require('../enums/error-message');

const SETTINGS = 'settings';
const DEFAULT = 'default';

class SettingsModel {
    constructor(db) {
        this.db = db;
    }

    get() {
        return new Promise((resolve, reject) => {
            if (this.db) {
                this.db(SETTINGS).first().then((data) => {
                    if (data) {
                        const defaultLanguage = data.default_language;
                        const template = data.template;
                        const supportedLanguageList = JSON.parse(data.language);

                        const _appName = JSON.parse(data.app_name);
                        const _keywords = JSON.parse(data.keywords);
                        const _description = JSON.parse(data.description);
                        const _logoString = JSON.parse(data.logo_string);
                        const _logoImage = JSON.parse(data.logo_image);
                        const _logoLink = JSON.parse(data.logo_link);
                        const _websiteTitle = JSON.parse(data.website_title);
                        const _websiteSubtitle = JSON.parse(data.website_subtitle);
                        const _backgroundImage = JSON.parse(data.background_image);
                        const _mainButtonString = JSON.parse(data.main_button_string);
                        const _mainButtonLink = JSON.parse(data.main_button_link);
                        const _blogName = JSON.parse(data.blog_name);

                        const settings = {};
                        // Processing the data with language
                        supportedLanguageList.forEach((language) => {
                            let appName = _appName[language];
                            let keywords = _keywords[language];
                            let description = _description[language];
                            let logoString = _logoString[language];
                            let logoImage = _logoImage[language];
                            let logoLink = _logoLink[language];
                            let websiteTitle = _websiteTitle[language];
                            let websiteSubtitle = _websiteSubtitle[language];
                            let backgroundImage = _backgroundImage[language];
                            let mainButtonString = _mainButtonString[language];
                            let mainButtonLink = _mainButtonLink[language];
                            let blogName = _blogName[language];

                            // Change default if there is no data
                            if (!appName) { appName = _appName[DEFAULT]; }
                            if (!keywords) { keywords = _keywords[DEFAULT]; }
                            if (!description) { description = _description[DEFAULT]; }
                            if (!logoString) { logoString = _logoString[DEFAULT]; }
                            if (!logoImage) { logoImage = _logoImage[DEFAULT]; }
                            if (!logoLink) { logoLink = _logoLink[DEFAULT]; }
                            if (!websiteTitle) { websiteTitle = _websiteTitle[DEFAULT]; }
                            if (!websiteSubtitle) { websiteSubtitle = _websiteSubtitle[DEFAULT]; }
                            if (!backgroundImage) { backgroundImage = _backgroundImage[DEFAULT]; }
                            if (!mainButtonString) { mainButtonString = _mainButtonString[DEFAULT]; }
                            if (!mainButtonLink) { mainButtonLink = _mainButtonLink[DEFAULT]; }
                            if (!blogName) { blogName = _blogName[DEFAULT]; }

                            // Store into settings
                            settings[language] = {
                                appName: appName,
                                keywords: keywords,
                                description: description,
                                logoString: logoString,
                                logoImage: logoImage,
                                logoLink: logoLink,
                                websiteTitle: websiteTitle,
                                websiteSubtitle: websiteSubtitle,
                                backgroundImage: backgroundImage,
                                mainButtonString: mainButtonString,
                                mainButtonLink: mainButtonLink,
                                blogName: blogName
                            };
                        });

                        resolve({
                            defaultLanguage: defaultLanguage,
                            template: template,
                            supportedLanguageList: supportedLanguageList,
                            settings: settings
                        });
                    } else {
                        reject(ErrorMessage.NO_DATA_IN_TABLE);
                    }
                }).catch((err) => {
                    reject(err);
                });
            } else {
                reject(ErrorMessage.NO_DATABASE);
            }
        });
    }
};

module.exports = SettingsModel;
