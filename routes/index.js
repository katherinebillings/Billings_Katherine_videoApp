var express = require('express');
var connect = require('../utils/sqlConnect');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {

  // do an SQL query to get all of the movies, including genre
  connect.query(`SELECT * FROM
    tbl_movies m, tbl_genre g, tbl_mov_genre mg
    WHERE m.movies_id = mg.movies_id
    AND g.genre_id = mg.genre_id`, (error, rows)=>  {
    if (error) {
      throw error;
    }else {
      res.render('home', {
        defaultMovie : rows[Math.floor(Math.random() * rows.length)],
        data : JSON.stringify(rows),
        mainpage : true,
        videopage : false,
        parent: false,
        kids: false
      });
    }
  })
});

router.get('/movies/:id/:vidsrc', (req, res) => {
  // get the movie deets from the server
  console.log(req.params.id, req.params.vidsrc);
  connect.query(`SELECT * FROM tbl_comments WHERE comments_movie = "${req.params.id}"`, (err, rows)=> {
    if (err) {
      console.log(err);
    } else {
      res.render('movie', {
        movie : req.params.id,
        trailer : req.params.vidsrc,
        data : JSON.stringify(rows),
        mainpage : false,
        videopage : true,
        parent: false,
        kids: false
      });
    }
  })
});

router.get('/parent', (req, res) => {
  connect.query(`SELECT * FROM tbl_movies m, tbl_genre g, tbl_mov_genre mg WHERE m.movies_id = mg.movies_id AND g.genre_id = mg.genre_id`, (err, rows)=>  {
    if (err) {
      throw err; console.log(err);
    } else {
      res.render('profile', {
        moviesList : rows.sort(function(a, b){return 0.5 - Math.random()}).slice(0,8),
        data : JSON.stringify(rows),
        title: 'Parents Page',
        mainpage: true,
        videopage: false,
        parent: true,
        kids: false
      });
    }
  });
});

router.get('/kids', (req, res) => {
  connect.query(`SELECT * FROM tbl_movies m, tbl_genre g, tbl_mov_genre mg, tbl_mov_age ma WHERE m.movies_id = mg.movies_id AND g.genre_id = mg.genre_id AND m.movies_id = ma.movies_id AND (ma.arating_id = 1 OR ma.arating_id = 2 OR ma.arating_id = 3)`, (err, rows)=>  {
    if (err) {
      throw err; console.log(err);
    } else {
      res.render('profile', {
        moviesList : rows.sort(function(a, b){return 0.5 - Math.random()}).slice(0,8),
        data : JSON.stringify(rows),
        title: 'Kids Page',
        mainpage: true,
        videopage: false,
        parent: false,
        kids: true
      });
    }
  });
});


module.exports = router;
