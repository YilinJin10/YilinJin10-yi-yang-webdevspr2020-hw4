const express = require('express');
const router = express.Router();
const btoa = require('btoa');
const atob = require('atob');

const URLAccessor = require('../model/shorter_url.model');

router.get('/', (req, res) => URLAccessor.getAllURL()
    .then(urls => res.send(urls)));

router.post('/', (req, res) => {
    // console.log(req.body.url);
    let urlData = req.body.url;
    //let brand = req.body.brand;
    //TODO: branded hashing
    URLAccessor.findURLByData(urlData)
        .then((response) => {
            if (response) {
                //res.status(200).send(btoa(response._id));
                res.status(200).send(response._id);
            } else {
                console.log('entry does not exist, creating new');
                return URLAccessor.insertURL(req.body)
                    .then((url) => {
                            return res.status(200).send(btoa(url._id))
                        },
                        error => res.status(500).send(error));
            }
        })
});

router.get('/:hash', function (req, res) {
    let baseid = req.params.hash;
    let id = atob(baseid);
    URLAccessor.findURLById(id)
        .then((response) => {
            if (response) {
                res.send(response.url);
            } else {
                res.send("not found")
                //res.status(404).send(`Invalid url provided :${error}`);
            }
        });
});

router.put('/:hash/edit', function (req, res) {
    let hash = req.params.hash;
    let id = atob(hash);
    URLAccessor.findURLById(id)
        .then((response) => {
            if (response) {
                return URLAccessor.updateURL(id, req.body)
                    .then((response) => res.status(200).send(req.body),
                        (error) => res.status(500).send(`Error updating url:${error}`))
            } else {
                res.send("hash not found")
                //res.status(404).send(`Invalid url provided :${error}`);
            }
        });

});

router.delete('/:hash/delete', function (req, res) {
    let hash = req.params.hash;
    let id = atob(hash);
    return URLAccessor.deleteURL(id)
        .then((response) => res.status(200).send("deleted" + response),
        (error) => res.status(500).send(`Error deleting url:${error}`))
});

module.exports = router;