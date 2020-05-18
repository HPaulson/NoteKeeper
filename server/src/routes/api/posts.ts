import { builtinModules } from "module"
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_AUTH, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
const express = require('express')
const router = express.Router()
router.use(bodyParser.json())
const posts = require('../../database/main.schema').Posts

router.get('/', async (req: any, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: { status: number; data: any, message: string }): any; new(): any } } }) => {
    return res.status(200).send({
        status: 200,
        message: 'OK',
        data: await posts.find({})
    }) 
})

router.post('/edit/:id', async (req: any, res: any) => {
    if (!req.params.id) {
        return res.status(400).send({
            status: 400,
            message: 'BAD REQUEST'
        })
    }
    if (!req.body.text) {
        return res.status(400).send({
            status: 400,
            message: 'BAD REQUEST'
        })
    }
        return await posts.updateOne({
            _id: req.params.id
        }, {
            $set: {
                text: req.body.text, edited: true
            }
        }, function(err) {
            console.log(err)
            if (err) {
            return res.status(400).send({
                status: 400,
                message: 'BAD REQUEST'
            }) }
            else {
                return res.status(201).send({
                    status: 201,
                    message: 'CREATED',
                    data: posts
                }) 
            }
        })
})

router.post('/', async (req: any, res: any) => {

    if (!req.body.text) {
        return res.status(400).send({
            status: 400,
            message: 'BAD REQUEST'
        })
    }
    function getRandomString(length) {
        var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var result = '';
        for ( var i = 0; i < length; i++ ) {
            result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
        }
        return result
    }
    await posts.create({
        _id: getRandomString(3),
        text: req.body.text,
        createdAt: new Date(),
        edited: false
    }).then(() => {
        return res.status(201).send({
            status: 201,
            message: 'CREATED',
            data: posts
        })
    }).catch((err) =>{
        return res.status(500).send({
            status: 500,
            message: 'SERVER ERROR',
            error: err
        })
    })
})

router.delete('/:id', async (req, res) => {
if (!req.params.id) {
    return res.status(400).send({
        status: 400,
        message: 'BAD REQUEST'
    })
}
if (req.params.id === 'nuke'){
    let docs = await posts.find({})
    docs.forEach(async (p) => {
        await posts.deleteOne({_id: p._id})
    })
    return res.status(200).send({
        status: 200,
        message: 'OK'
    })
}
await posts.deleteOne({_id: req.params.id})
return res.status(200).send({
    status: 200,
    message: 'OK'
})
})

module.exports = router