const { Router } = require('express');
const router = Router();

router.get('/', (req, res, mext) => {
  res.send({ test_message: 'hello /api/test_route/' })
});

router.get('/route2', (req, res, mext) => {
  res.send({ test_message: 'hello /api/test_route/route2' })
});


module.exports = router;