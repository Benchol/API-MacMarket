const { JsonDB } = require('node-json-db')
const { Config } = require('node-json-db/dist/lib/JsonDBConfig')
const jwt = require('jsonwebtoken')
const sessionModel = require('../models/session/session.model')
const userModel = require('../models/user/user.model')

var db = new JsonDB('session', true, false, '/');

module.exports = async(req, res, next) => {

    // console.log('eserr : ', user);
    if (req.header('Authorization')) {

        var decoded = jwt.decode(req.header('Authorization').split(' ')[2])
        var idUser = decoded.userId
            // console.log('id', idUser);
        let user = await sessionModel.findOne({ _id: idUser })


        console.log('User also connected');
        let _user = await userModel.findOne({ _id: idUser }).populate({ path: 'cart' })
        _user.isConnected = true;
        // console.log('_user ', _user);
        req.user = _user
        next()

    } else {

        // const userSession = new sessionModel({
        //     _id: decoded.userId,
        //     userId: decoded.userId,
        //     iat: decoded.iat,
        //     exp: decoded.exp
        // })

        // userSession.save()
        //     .then(() => {
        //         console.log('Session saved');
        //     })
        //     .catch(err => {
        //         console.log('Error in saved session');
        //     })
        //     // console.log('User must connected');
        // next()
        res.status(402).json({
            status: false,
            message: 'User must be connected for the access data'
        })
    }

}