module.exports = (app, express, config) => {
    app.set('views', app.get('_VIEWS_PATH') + '/frontend');
    app.get('/', (req, res) => {
        if (req.user) {
            res.writeHead(302, {
                'Location': app.locals.baseUrl + '/task'
            });
            res.end();
        } else {
            res.render('home', {
                title: 'Home',
                layout: 'layout'
            });
        }
    });

    // app.get('/:param', (req, res) => {
    //     res.render('404', {
    //         url: req.url,
    //         title: 'Not found',
    //         layout: 'layout'
    //     });
    // });
};