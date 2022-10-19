const express = require('express');
const router = express.Router();
// const {body , validationResult} = require('express-validator');
const User = require('../models/User');
// const bcrypt = require('bcryptjs');
// const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
// const authenticate = require('../middlewares/authenticate');



/*
    @usage : Login a User
    @url : /api/users/login
    @fields : email , password
    @method : POST
    @access : PUBLIC
 */

export interface IRequest {
    avatarUrl: string
    city: string
    companyName: string
    countryCode: string
    email: string
    facebookId: string
    firstName: string
    gender: string
    isAmbassador: boolean
    isBusiness: boolean
    isVerified: boolean
    jobTitle: string
    lastName: string
    payload: string
    phoneNumber: string
    requestNonce: string
    signature: string
    signatureAlgorithm: string
    street: string
    successful: boolean
    twitterId: string
    url: string
    zipcode: string
}


router.post('/login' ,  async (request , response) => {

    try {
        const data : IRequest  = request.body;
        // create a user
        if (data.companyName) {

            const userData = {
                avatarUrl: data.avatarUrl,
                city: data.city,
                companyName: data.companyName,
                countryCode: data.countryCode,
                email: data.email,
                facebookId: data.facebookId,
                firstName: data.firstName,
                gender: data.gender,
                isAmbassador: data.isAmbassador,
                isBusiness: data.isBusiness,
                isVerified: data.isVerified,
                jobTitle: data.jobTitle,
                lastName: data.lastName,
                payload: data.payload,
                phoneNumber: data.phoneNumber,
                requestNonce: data.requestNonce,
                signature: data.signature,
                signatureAlgorithm: data.signatureAlgorithm,
                street: data.street,
                successful: data.successful,
                twitterId: data.twitterId,
                url: data.url,
                zipcode: data.zipcode,
            }

            // saving user to DB

            user = new User(userData);
            user = await user.save();


            // create a token
            let payload = {
                user: {
                    companyName: data.companyName,
                },
            };
            jwt.sign(payload, process.env.JWT_SECRET_KEY, {expiresIn: 360000000}, (err, token) => {
                if (err) throw err;
                response.status(200).json({
                    msg: 'User Created and token given',
                    token: token
                });
            })
        }
    }
    catch (error) {
        console.error(error);
        response.status(500).json({errors : [{msg : error.message}]});
    }
});


module.exports = router;