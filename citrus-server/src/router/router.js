const express = require('express');
const survey = require('../service/survey')
const singup = require('../service/signup')
const router = express.Router()
router.get('/survey/:id',survey.GetByID)
router.post('/survey/:id',survey.SaveById)
router.get('/signup',singup.SignUp)
module.exports={
    router
}