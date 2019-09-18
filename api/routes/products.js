const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Hello get request'
    })
});

router.post('/', (req, res, next) => {
    res.status(200).json({
        message: 'Hello post request'
    })
});

router.post('/:productID', (req, res, next) => {
    const id = req.params.productID;
    if(id == 'special'){
        res.status(200).json({
            message: 'You discovered an ID',
            id: id
        });
    }else{
        res.status(200).json({
            message: 'You passed an ID'
        });
    }
});

module.exports = router;
