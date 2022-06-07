module.exports = (req, res, next) => {
    console.log('Checking session...');
    // console.log('Body => ', req.session.id);
    if (req.session || req.session.userId) {
        console.log('User session => ', req.session)
        console.log('Request checked');
        return next()
    } else {
        console.log('Request not checked, access denied');
        return res.status(401).json({
            status: false,
            message: 'Access denied'
        })
    }
    // req.session.regenerate((err) => {
    //     console.log('Errorr => ', err);
    // })
    // req.session.get(req.session.id, (error, session) => {
    //     console.log(session);
    // })
}