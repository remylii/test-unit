import express from 'express';

const app = new express();
const port = process.env.PORT || 3207;

app.listen(port, () => {
  console.log('GET express server on port ' + port);
});

app.use(express.static('public'));

app.get('/ajax/item', (req, res) => {
  res.json({
    status: 0,
    response: {
      name: 'Anzu Futaba',
      age: 17
    }
  });
});

app.get('/ajax/second-item', (req, res) => {
  res.json({
    status: 0,
    response: {
      title: 'あんずのうた',
      category: 'cute'
    }
  });
});
