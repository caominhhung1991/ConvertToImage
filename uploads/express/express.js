const PORT = process.env.PORT || 4001;

app.get('/expressions/:id', (req, res, next) => {
  const foundExpression = getElementById(req.params.id, expressions);
  if(foundExpression) {
	  res.send(foundExpression);
  } else {
	  res.status(404).send('not find id');
  }
});

app.put('/expressions/:id', (req, res, next) => {
	const expressionIndex = getIndexById(req.params.id, expressions);
	if(expressionIndex != -1) {
		updatElement(req.params.id, req.query, expression);
		res.send(expressions[expressionIndex])
	} else {
		res.status(404).send('Id not exists');
	}
})

app.put('/expressions/:id', (req, res, next) => {
  const expressionIndex = getIndexById(req.params.id, expressions);
  if (expressionIndex !== -1) {
    updateElement(req.params.id, req.query, expressions);
    res.send(expressions[expressionIndex]);
  } else {
    res.status(404).send();
  }
});

// Add your POST handler below:
app.post('/expressions', (req, res, next) => {
  const receivedExpression = createElement('expressions', req.query);
  if (receivedExpression) {
    expressions.push(receivedExpression);
    res.status(201).send(receivedExpression);
  } else {
    res.status(400).send();
  }
});

// Add your DELETE handler below:
app.delete('/expressions/:id', (req, res, next) => {
	const expressIndex = getIndexById(req.params.id, expressions);
	if(expressIndex != -1) {
		expressions.split(expressIndex, 1);
		res.status(204).send('Delete complete!');
	} else {
		res.status(404).send('Delete failed!');
	}
})

app.get('/animals', (req, res, next) => {
	res.send(animals);
})

app.get('/animals/:id', (req, res, next) => {
	const animalIndex = getIndexById(req.params.id, animals);
	if(animalIndex != -1) {
		res.send(animals[animalIndex]);
	} else {
		res.status(404).send();
	}
})

app.put('/animals/:id', (req, res, next) => {
	const animalIndex = getIndexById(req.params.id, animals);
	if(animalIndex != -1) {
		updateElement(req.params.id, req.query, animals);
		res.send(animals[animalIndex]);
	} else {
		res.status(404).send();
	}
})

app.post('/animals', (req, res, next) => {
	const receivedAnimal = createElement('animals', req.query);
	if(receivedAnimal) {
		animals.push(receivedAnimal);
		res.status(201).send();
	} else {
		res.status(400).send();
	}
})

app.delete('/animal/:id', (req, res, next) => {
	const animalIndex = getIndexById(req.params.id, animals);
	if(aniamalIndex != -1) {
		animal.splice(animalIndex, 1);
		res.status(204).send();
	} else {
		res.status(404).send();
	}
})

const expressRouter = express.Router();
app.use('/expressions', experssRouter);

const express = require('express');
const animalsRouter = express.Router();

const logRequest = (verb) => {
	console.log(`${verb} Request Received`);
}

app.use((req, res, next) => {
	console.log(`${req.method} Request Received`)
});

// Add your code below:
app.use('/beans/:beanName', (req, res, next) => {
  const beanName = req.params.beanName;
  if (!jellybeanBag[beanName]) {
    console.log('Response Sent');
    return res.status(404).send('Bean with that name does not exist');
  }
  req.bean = jellybeanBag[beanName];
  req.beanName = beanName;
  next();
});

app.get('/beans/:beanName', (req, res, next) => {
  res.send(req.bean);
  console.log('Response Sent');
});
app.delete('/beans/:beanName', (req, res, next) => {
  jellybeanBag[req.beanName] = null;
  res.status(204).send();
  console.log('Response Sent');
});


logRequest('POST');
logRequest('GET');

req.method = 'POST', 'GET', 'PUT', 'DELETE'

app.use(['/beans/', '/beans/:beanName'], (req, res, next) => {
	let bodyData = '';
	req.on('data', (data) => {
		bodyData += data;
	});

	req.on('end', () => {
		if(bodyData) {
			req.body = JSON.parse(bodyData);
		}
		next();
	})
})











// k: nén hơi lại trong cổ họng. 

