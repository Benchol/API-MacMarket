module.exports = (req, res, next) => {
    // console.log('3', req.header('Authorization'));
    if (req.session && req.session.userId) {
        console.log('Token exist : ', req.session);
        next()
    } else {
        // console.log('Create token => ', req.header('Authorization').split(' ')[2]);
        // req.session.userId = req.header('Authorization').split(' ')[2]
        // req.session.userId = 'gnzegoergzoirngetonh'
        console.log('Token created => ', req.session);
        next()
    }
}