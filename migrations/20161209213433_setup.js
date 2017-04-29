
exports.up = (knex, Promise) => {
    return Promise.all([
        knex.schema.createTable('users', (table) => {
            table.increments('id').primary();
            table.text('first_name');
            table.text('middle_name');
            table.text('last_name');
            table.text('description');
            table.string('picture');
            table.string('username');
            table.string('password');
            table.integer('role');
            table.timestamps();
        }).then(() => {
            // Setup default value
            return knex('users').insert([{
                first_name: JSON.stringify({
                    default: 'Tony',
                    en: 'Tony',
                    tw: '鉫原'
                }),
                middle_name: JSON.stringify({
                    default: '',
                    en: '',
                    tw: ''
                }),
                last_name: JSON.stringify({
                    default: 'Huang',
                    en: 'Huang',
                    tw: '黃'
                }),
                description: JSON.stringify({
                    default: 'I\'m a backend developer and love to create something new to change the world',
                    en: 'I\'m a backend developer and love to create something new to change the world',
                    tw: '我是一個後端開發人員，我喜歡創造新東西來改變世界'
                }),
                picture: 'https://avatars3.githubusercontent.com/u/2835778?v=3&s=150',
                username: 'admin',
                password: '$2a$10$eITFkcLnMbpF2G4pLsgGgeAwzsA/PDVG5JZgjX4Db1lEhaDEAjUSC',   // admin
                role: 99
            }]);
        }),
        knex.schema.createTable('portfolios', (table) => {
            table.increments('id').primary();
            table.text('name');
            table.text('client');
            table.text('role');
            table.text('description');
            table.string('link');
            table.string('picture');
        }).then(() => {
            // Setup default value
            return knex('portfolios').insert([{
                name: JSON.stringify({
                    default: 'MyPress',
                    en: 'MyPress',
                    tw: 'MyPress'
                }),
                client: JSON.stringify({
                    default: 'MyPress',
                    en: 'MyPress',
                    tw: 'MyPress'
                }),
                role: JSON.stringify({
                    default: 'Creator',
                    en: 'Creator',
                    tw: '創作者'
                }),
                description: JSON.stringify({
                    default: 'MyPress is simply to create a website to introduce yourself',
                    en: 'MyPress is simply to create a website to introduce yourself',
                    tw: 'MyPress 讓你簡單的創建網站來介紹您自己'
                }),
                link: 'https://github.com/starlightslo/mypress2',
                picture: '/images/img1.png'
            }]);
        }),
        knex.schema.createTable('skills', (table) => {
            table.increments('id').primary();
            table.text('name');
            table.integer('percent');
            table.string('color');
            table.integer('animate_time');
            table.text('order');
        }).then(() => {
            // Setup default value
            return knex('skills').insert([{
                name: JSON.stringify({
                    default: 'User Interface',
                    en: 'User Interface',
                    tw: '使用者介面'
                }),
                percent: 73,
                color: '#35AFBA',
                animate_time: 3000,
                order: 1
            },{
                name: JSON.stringify({
                    default: 'Frontend',
                    en: 'Frontend',
                    tw: '前端'
                }),
                percent: 85,
                color: '#FF6060',
                animate_time: 3000,
                order: 2
            },{
                name: JSON.stringify({
                    default: 'Backend',
                    en: 'Backend',
                    tw: '後端'
                }),
                percent: 99,
                color: '#3AD079',
                animate_time: 3000,
                order: 3
            },{
                name: JSON.stringify({
                    default: 'User Experience',
                    en: 'User Experience',
                    tw: '使用者體驗'
                }),
                percent: 40,
                color: '#58C0E3',
                animate_time: 3000,
                order: 4
            }]);
        }),
        knex.schema.createTable('experiences', (table) => {
            table.increments('id').primary();
            table.text('company_name');
            table.string('company_logo');
            table.text('role');
            table.text('description');
            table.date('start_working_date');
            table.date('end_working_date');
            table.boolean('still_here');
        }).then(() => {
            // Setup default value
            return knex('experiences').insert([{
                company_name: JSON.stringify({
                    default: 'Facebook',
                    en: 'Facebook',
                    tw: '臉書'
                }),
                company_logo: 'images/asset01.jpg',
                role: JSON.stringify({
                    default: 'UI/UX Designer',
                    en: 'UI/UX Designer',
                    tw: 'UI/UX 設計師'
                }),
                description: JSON.stringify({
                    default: 'October 2015 – Present (2 months)Menlo Park, CA, United States of America',
                    en: 'October 2015 – Present (2 months)Menlo Park, CA, United States of America',
                    tw: 'October 2015 – Present (2 months)Menlo Park, CA, 美國'
                }),
                start_working_date: '2015/10/01',
                end_working_date: '2015/10/01',
                still_here: true
            },{
                company_name: JSON.stringify({
                    default: 'Amazon',
                    en: 'Amazon',
                    tw: '雅馬遜'
                }),
                company_logo: 'images/asset02.jpg',
                role: JSON.stringify({
                    default: 'UI/UX Designer',
                    en: 'UI/UX Designer',
                    tw: 'UI/UX 設計師'
                }),
                description: JSON.stringify({
                    default: 'October 2014 – September 2015 (2 months)Menlo Park, CA, United States of America',
                    en: 'October 2014 – September 2015 (2 months)Menlo Park, CA, United States of America',
                    tw: 'October 2014 – September 2015 (2 months)Menlo Park, CA, 美國'
                }),
                start_working_date: '2014/10/01',
                end_working_date: '2015/09/30',
                still_here: false
            },{
                company_name: JSON.stringify({
                    default: 'Apple',
                    en: 'Apple',
                    tw: '蘋果'
                }),
                company_logo: 'images/asset03.jpg',
                role: JSON.stringify({
                    default: 'UI/UX Designer',
                    en: 'UI/UX Designer',
                    tw: 'UI/UX 設計師'
                }),
                description: JSON.stringify({
                    default: 'October 2010 – September 2014 (2 months)Menlo Park, CA, United States of America',
                    en: 'October 2010 – September 2014 (2 months)Menlo Park, CA, United States of America',
                    tw: 'October 2010 – September 2014 (2 months)Menlo Park, CA, 美國'
                }),
                start_working_date: '2010/10/01',
                end_working_date: '2014/09/30',
                still_here: false
            },{
                company_name: JSON.stringify({
                    default: 'IBM',
                    en: 'IBM',
                    tw: 'IBM'
                }),
                company_logo: 'images/asset04.jpg',
                role: JSON.stringify({
                    default: 'UI/UX Designer',
                    en: 'UI/UX Designer',
                    tw: 'UI/UX 設計師'
                }),
                description: JSON.stringify({
                    default: 'October 2008 – September 2010 (2 months)Menlo Park, CA, United States of America',
                    en: 'October 2008 – September 2010 (2 months)Menlo Park, CA, United States of America',
                    tw: 'October 2008 – September 2010 (2 months)Menlo Park, CA, 美國'
                }),
                start_working_date: '2008/10/01',
                end_working_date: '2010/09/30',
                still_here: false
            }]);
        }),
        knex.schema.createTable('menus', (table) => {
            table.increments('id').primary();
            table.text('name');
            table.string('link');
            table.text('order');
        }).then(() => {
            // Setup default value
            return knex('menus').insert([{
                name: JSON.stringify({
                    default: 'About',
                    en: 'About',
                    tw: '關於'
                }),
                link: '#About',
                order: 1
            },{
                name: JSON.stringify({
                    default: 'Portfolio',
                    en: 'Portfolio',
                    tw: '作品'
                }),
                link: '#Portfolio',
                order: 2
            },{
                name: JSON.stringify({
                    default: 'Skills',
                    en: 'Skills',
                    tw: '技能'
                }),
                link: '#skills',
                order: 3
            },{
                name: JSON.stringify({
                    default: 'Experience',
                    en: 'Experience',
                    tw: '經歷'
                }),
                link: '#Experience',
                order: 4
            }]);
        }),
        knex.schema.createTable('settings', (table) => {
            table.text('app_name');
            table.text('keywords');
            table.text('description');
            table.text('language');
            table.string('default_language');
            table.string('template');
            table.text('logo_string');
            table.text('logo_image');
            table.text('logo_link');
            table.string('website_title');
            table.text('website_subtitle');
            table.text('background_image');
            table.text('main_button_string');
            table.text('main_button_link');
            table.text('blog_name');
        }).then(() => {
            // Setup default value
            return knex('settings').insert([{
                app_name: JSON.stringify({
                    default: 'MyPress',
                    en: 'MyPress',
                    tw: 'MyPress'
                }),
                keywords: JSON.stringify({
                    default: 'MyPress, Node, personal, company',
                    en: 'MyPress, Node, personal, company',
                    tw: 'MyPress, Node, 個人, 公司'
                }),
                description: JSON.stringify({
                    default: 'MyPress is simply to create a website to introduce yourself',
                    en: 'MyPress is simply to create a website to introduce yourself',
                    tw: 'MyPress 讓你簡單的創建網站來介紹您自己'
                }),
                language: JSON.stringify(['en','tw']),
                default_language: 'en',
                template: 'default',
                logo_string: JSON.stringify({
                    default: 'MyPress',
                    en: 'MyPress',
                    tw: 'MyPress'
                }),
                logo_image: JSON.stringify({
                    default: '',
                    en: '',
                    tw: ''
                }),
                logo_link: JSON.stringify({
                    default: '#',
                    en: '#',
                    tw: '#'
                }),
                website_title: JSON.stringify({
                    default: 'PERSONAL & COMPANY',
                    en: 'PERSONAL & COMPANY',
                    tw: '個人 & 公司'
                }),
                website_subtitle: JSON.stringify({
                    default: 'MyPress is simply to create a website to introduce yourself',
                    en: 'MyPress is simply to create a website to introduce yourself',
                    tw: 'MyPress 讓你簡單的創建網站來介紹您自己'
                }),
                background_image: JSON.stringify({
                    default: '/images/slider.jpg',
                    en: '/images/slider.jpg',
                    tw: '/images/slider.jpg'
                }),
                main_button_string: JSON.stringify({
                    default: 'DOWNLOAD',
                    en: 'DOWNLOAD',
                    tw: '快速下載'
                }),
                main_button_link: JSON.stringify({
                    default: 'https://github.com/starlightslo/mypress2',
                    en: 'https://github.com/starlightslo/mypress2',
                    tw: 'https://github.com/starlightslo/mypress2'
                }),
                blog_name: JSON.stringify({
                    default: 'MyPress Blog',
                    en: 'MyPress Blog',
                    tw: 'MyPress 部落格'
                })
            }]);
        })
    ]);
};

exports.down = (knex, Promise) => {
    return Promise.all([
        knex.schema.dropTable('users'),
        knex.schema.dropTable('portfolios'),
        knex.schema.dropTable('skills'),
        knex.schema.dropTable('experiences'),
        knex.schema.dropTable('menus'),
        knex.schema.dropTable('settings')
    ]);
};
