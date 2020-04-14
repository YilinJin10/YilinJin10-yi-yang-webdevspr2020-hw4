const express = require('express');
const router = express.Router();


const BrandedAccessor = require('../model/branded.model');

router.get('/', (req, res) => BrandedAccessor.getAllURL()
    .then(urls => res.send(urls)));

router.post('/', (req, res) => {
    console.dir(req.body);
    //let urlData = req.body.url;
    let brand = req.body._id;
    BrandedAccessor.findURLById(brand)
        .then((response) => {
            if (response) {
                res.send("this brand has existed, please input a new one")
                    // .redirect('/');
            } else {
                console.log('entry does not exist, creating new');
                return BrandedAccessor.insertURL(req.body)
                    .then((url) => {
                            return res.status(200).send(url)
                        },
                        error => res.status(500).send(error));
            }
        })
});

router.get('/:brand', function (req, res) {
    let id = req.params.brand;
    BrandedAccessor.findURLById(id)
        .then((response) => {
            if (response) {
                // TODO: handle invalid url???
                res.send(response.url);
            } else {
                res.send("not found")
                //res.status(404).send(`Invalid url provided :${error}`);
            }
        });
});

router.put('/:brand/edit', function (req, res) {
    let id = req.params.brand;
    BrandedAccessor.findURLById(id)
        .then((response) => {
            if (response) {
                return BrandedAccessor.updateURL(id, req.body)
                    .then((response) => res.status(200).send(req.body),
                        (error) => res.status(500).send(`Error updating url:${error}`))
            } else {
                res.send("branded hash not found")
                //res.status(404).send(`Invalid url provided :${error}`);
            }
        });

});

router.delete('/:brand/delete', function (req, res) {
    let id = req.params.brand;
    BrandedAccessor.findURLById(id)
        .then((response) => {
            if (response) {
                return BrandedAccessor.deleteURL(id)
                    .then((response) => res.status(200).send("deleted" + response),
                        (error) => res.status(500).send(`Error deleting url:${error}`))
            } else {
                res.send("branded hash not found")
                //res.status(404).send(`Invalid url provided :${error}`);
            }
        });
});

module.exports = router;