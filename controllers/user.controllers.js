const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userModel = require('../models/user/user.model');
const Materials = require('../models/material/material.model')
const mongoose = require('mongoose')

exports.register = (req, res) => {
    console.log(req.body.username);
    bcrypt.hash(req.body.password, 10)
        .then(pswHash => {
            const user = new userModel({
                name: req.body.name,
                username: req.body.username,
                image: '',
                email: req.body.email,
                password: pswHash,
                wallet: 0,
                cart: []
            });

            user.save()
                .then(
                    () => {
                        res.status(201).json({
                            status: true,
                            message: 'User registered successfully'
                        })
                    }
                )
                .catch(err => {
                    res.status(400).json({
                        status: false,
                        message: err
                    })
                })
        })
        .catch(err => {
            res.status(500).json({
                status: false,
                message: err
            })
        })


}

exports.login = (req, res) => {
    // const userId = await sessionClient
    // console.log('Request session => ', req.session);
    userModel.findOne({ username: req.body.username })
        .populate({
            path: 'cart'
        })
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    status: false,
                    message: 'Username inexistant'
                })
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({
                            status: false,
                            message: 'Password incorrect'
                        })
                    }
                    res.status(200).json({
                        status: true,
                        data: user,
                        token: jwt.sign({ userId: user._id },
                            'RANDOM_TOKEN_SECRET', { expiresIn: '24h' }
                        )
                    })
                })
                .catch(err => res.status(401).json({
                    status: false,
                    message: 'Password incorrect'
                }))
        })
        .catch(err => res.status(401).json({
            status: false,
            message: 'Username inexistant'
        }))
}

exports.addProduct = (req, res) => {
    const token = req.header('Authorization').split(' ')[2];
    var idProduct = req.body.idProduct;
    const _id = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    console.log(mongoose.Types.ObjectId(_id.userId));
    userModel.findOne({ _id: _id.userId })
        .populate({
            path: 'cart'
        })
        .then(user => {
            idProduct = mongoose.Types.ObjectId(idProduct)

            Materials.findOne({ _id: idProduct })
                .then(
                    material => {
                        user.cart.push(material)
                        user.save()
                            .then(
                                () => {
                                    res.status(200).json({
                                        status: true,
                                        message: 'add successfull',
                                        data: user
                                    })
                                })
                            .catch(err => {
                                console.log('Error ' + err);
                                res.status(400).json({
                                    status: false,
                                    message: 'Update error ' + err
                                })
                            })
                    }
                )
                .catch(err => {
                    res.status(400).json({
                        status: false,
                        message: 'Error material not found ' + err
                    })
                })
        })
        .catch(
            err => {
                res.status(400).json({
                    status: false,
                    message: 'Error user not found ' + err
                })
            }
        )
}

exports.deleteInCart = (req, res) => {
    const token = req.header('Authorization').split(' ')[2];
    var idProduct = req.body.idProduct;
    const _id = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    console.log('Deleting...');
    userModel.findOne({ _id: _id.userId })
        .populate({
            path: 'cart'
        })
        .then(user => {
            // idProduct = mongoose.Types.ObjectId(idProduct);
            let count = 0
            user.cart = user.cart.filter(
                m => {
                    // console.log('Stringify => ', String(m._id));
                    if (String(m._id) == idProduct) {
                        // console.log('Same => ', m, idProduct);
                        if (count != 0) {
                            return m;
                        }
                        count++;
                    } else {
                        // console.log('Not same => ', m, idProduct);
                        return m;
                    }
                }
            )

            // console.log(user.cart);

            user.save()
                .then(
                    () => {
                        res.status(200).json({
                            status: true,
                            message: 'delete in cart successfull',
                            data: user
                        })
                    })
                .catch(err => {
                    console.log('Error ' + err);
                    res.status(400).json({
                        status: false,
                        message: 'Update error ' + err
                    })
                })

        })
}


exports.updateUser = (req, res) => {
    console.log('updating...', req.body);
    const token = req.header('Authorization').split(' ')[2];
    const _id = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    console.log('id => ', typeof(_id.userId));
    userModel.findOne({ _id: _id.userId })
        .populate({
            path: 'cart'
        })
        .then(
            user => {
                console.log(user);
                user.name = req.body.name;
                user.username = req.body.username;
                user.wallet = req.body.wallet;

                user.save()
                    .then(
                        res.status(200).json({
                            status: true,
                            message: 'User update successfully',
                            data: user
                        })
                    )
                    .catch(
                        err => {
                            res.status(400).json({
                                status: false,
                                message: 'Error saving modification ' + err
                            })
                        }
                    )
            }
        )
        .catch(err => {
            res.status(400).json({
                status: false,
                message: 'User not found ' + err
            })
        })
}


exports.logout = (req, res) => {
    req.session.destroy();
    res.status(200).json({
        status: true,
        message: 'Logout succes'
    })
}