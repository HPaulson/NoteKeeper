var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_AUTH, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});
const express = require('express');
const router = express.Router();
router.use(bodyParser.json());
const posts = require('../../database/main.schema').Posts;
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.status(200).send({
        status: 200,
        message: 'OK',
        data: yield posts.find({})
    });
}));
router.post('/edit/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.params.id) {
        return res.status(400).send({
            status: 400,
            message: 'BAD REQUEST'
        });
    }
    if (!req.body.text) {
        return res.status(400).send({
            status: 400,
            message: 'BAD REQUEST'
        });
    }
    return yield posts.updateOne({
        _id: req.params.id
    }, {
        $set: {
            text: req.body.text, edited: true
        }
    }, function (err) {
        console.log(err);
        if (err) {
            return res.status(400).send({
                status: 400,
                message: 'BAD REQUEST'
            });
        }
        else {
            return res.status(201).send({
                status: 201,
                message: 'CREATED',
                data: posts
            });
        }
    });
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.text) {
        return res.status(400).send({
            status: 400,
            message: 'BAD REQUEST'
        });
    }
    function getRandomString(length) {
        var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var result = '';
        for (var i = 0; i < length; i++) {
            result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
        }
        return result;
    }
    yield posts.create({
        _id: getRandomString(3),
        text: req.body.text,
        createdAt: new Date(),
        edited: false
    }).then(() => {
        return res.status(201).send({
            status: 201,
            message: 'CREATED',
            data: posts
        });
    }).catch((err) => {
        return res.status(500).send({
            status: 500,
            message: 'SERVER ERROR',
            error: err
        });
    });
}));
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.params.id) {
        return res.status(400).send({
            status: 400,
            message: 'BAD REQUEST'
        });
    }
    if (req.params.id === 'nuke') {
        let docs = yield posts.find({});
        docs.forEach((p) => __awaiter(void 0, void 0, void 0, function* () {
            yield posts.deleteOne({ _id: p._id });
        }));
        return res.status(200).send({
            status: 200,
            message: 'OK'
        });
    }
    yield posts.deleteOne({ _id: req.params.id });
    return res.status(200).send({
        status: 200,
        message: 'OK'
    });
}));
module.exports = router;
