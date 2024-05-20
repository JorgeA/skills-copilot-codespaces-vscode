// Create a web server that listens on port 3000 and when you visit the root of your website it should display “Hello World” with a form that has a text input and a submit button. When the form is submitted, it should make a POST request to /comments with the value of the text input and then display the value on the page.

// Create a web server that listens on port 3000
const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <form method="POST" action="/comments">
        <input type="text" name="comment" />
        <button type="submit">Submit</button>
      </form>
    `);
  } else if (req.url === '/comments' && req.method === 'POST') {
    const body = [];
    req.on('data', chunk => {
      body.push(chunk);
    }).on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const comment = parsedBody.split('=')[1];
      fs.appendFile('comments.txt', comment + '\n', err => {
        if (err) throw err;
        res.end(`
          <h1>Comment Received!</h1>
          <p>${comment}</p>
        `);
      });
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('<h1>Not Found</h1>');
  }
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});
// When the form is submitted, it should make a POST request to /comments with the value of the text input and then display the value on the page.
// To read the body of the request, we need to listen for the data event and push the data chunks into an array. When the request has finished, we can concatenate the chunks into a single string and parse it using the Buffer.concat(body).toString() method.
// We can then extract the value of the text input by splitting the parsed body on the equal sign and grabbing the second element of the resulting array.
// Finally, we can append the comment to a file named comments.txt and display the comment on the page.

// Path: comments.txt