const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');


router.get('/', async (req, res) => {
  console.log(req.session)
    try {
      // Get all projects and JOIN with user data
      const postData = await Post.findAll({
        where: {
            userId: req.session.user_id
        }
      });
      console.log(postData)
  
      // Serialize data so the template can read it
      const posts = postData.map((post) => post.get({ plain: false }));
  // res.json(posts)
      // Pass serialized data and session flag into template
      res.render('dashboard', { 
        posts, 
        logged_in: req.session.logged_in 
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });


  // router.get('/newpost', withAuth, (req, res) => {
  //   res.render('newpost');
  // });

  
  router.get('/:id/editpost', withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
        });
    
        const posts = postData.get({ plain: true });
    // res.json(posts)
        res.render('editpost', {
          posts,
        });
      } catch (err) {
        res.status(500).json(err);
      }
  });
  

  module.exports = router;
