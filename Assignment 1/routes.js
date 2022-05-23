
const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;
    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>Hello message</title></head>')
        res.write('<body>');
        res.write('<form action="/create-user" method="POST">');
        res.write('<input type="text" name="username"><button type="submit">');
        res.write('Add user</button></form></body>');
        res.write('</html>');
        return res.end();
    }

    if (url === '/users') {
        res.write('<html>');
        res.write('<head><title>List of users</title></head>');
        res.write('<body>');
        res.write('<ul><li>Tifa Lockhart</li></ul>');
        res.write('<ul><li>Aerith Giansborough</li></ul>');
        res.write('<ul><li>Berret Wallace</li></ul>');
        res.write('<ul><li>Cloud Strife</li></ul>');
        res.write('</body>');
        res.write('</html>');
        return res.end();
    }

    if (url === '/create-user' && method === "POST") {
        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const username = parsedBody.split('=')[1];
            console.log("Adding user: " + username);
        });
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
    }
}








exports.handler = requestHandler;