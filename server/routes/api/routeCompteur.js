const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
  console.log('params: ', req.params);
  console.log('body: ', req.body);
  console.log('query: ', req.query);

  res.send({message: "hello"});
})

router.post('/', (req, res) => {
  console.log('params: ', req.params);
  console.log('body: ', req.body);
  console.log('query: ', req.query);
  
  res.send({message: "hello"});
})

module.exports = router;