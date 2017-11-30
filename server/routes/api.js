
const express =  require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Video = require('../models/video');

const db = "mongodb://arindita:arisaha@ds121456.mlab.com:21456/videoplayer";
mongoose.Promise = global.Promise;

mongoose.connect(db,{ useMongoClient: true}, function(err){
    if(err){
        console.error("Error!"+err);
    }
});

router.get('/videos', function(request, response){
    console.log('Get Request For All Videos');
    Video.find({})
    .exec(function(err, videos){
        if(err){
            console.log("Error While Retrieving Videos");
        }else{
            response.json(videos);
        }
    });
});

router.get('/videos/:id', function(request, response){
    console.log('Get Request For A Single Video');
    Video.findById(request.params.id)
    .exec(function(err, video){
        if(err){
            console.log("Error While Retrieving Video");
        }else{
            response.json(video);
        }
    });
});

router.post('/video', function(req, res){
    console.log('Post A Video');
    var newVideo = new Video();
    newVideo.title = req.body.title;
    newVideo.url = req.body.url;
    newVideo.description = req.body.description;
    newVideo.save(function(err, insertedVideo){
        if (err){
            console.log('Error! '+err);
        }else{
            res.json(insertedVideo);
        }
    })
})

router.put('/video/:id',function(req,res){
    console.log('update a video');
    Video.findByIdAndUpdate(req.params.id,{
        $set: {title: req.body.title, url: req.body.url, description: req.body.description}
    },
    {
        new: true
    },
    function(err, updateVideo){
        if(err){
            res.send("Error while updating video");
        }else{
            res.json(updateVideo)
        }
    }
    );
});

router.delete('/video/:id', function(req, res){
    console.log('Deleting a video');
    Video.findByIdAndRemove(req.params.id, function(err, deleteVideo){
        if(err){
            res.send("Error while deleting video");
        }else{
            res.json(deleteVideo);
        }
    });
});
module.exports = router;