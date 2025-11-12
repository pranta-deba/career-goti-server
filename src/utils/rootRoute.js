export const rootRoute = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>CareerGoti - Find Your Dream Job</title>
      <style>
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        body {
          background: linear-gradient(to right, #4facfe, #00f2fe);
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          color: #fff;
        }
        .container {
          text-align: center;
          padding: 2rem 3rem;
          background: rgba(0, 0, 0, 0.3);
          border-radius: 15px;
          box-shadow: 0 8px 20px rgba(0,0,0,0.2);
        }
        h1 {
          font-size: 3rem;
          margin-bottom: 1rem;
        }
        p {
          font-size: 1.2rem;
          margin-bottom: 2rem;
        }
        a {
          display: inline-block;
          text-decoration: none;
          padding: 0.8rem 2rem;
          background: #fff;
          color: #4facfe;
          font-weight: bold;
          border-radius: 50px;
          transition: 0.3s ease;
        }
        a:hover {
          background: #4facfe;
          color: #fff;
          box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        }
        @media (max-width: 600px) {
          h1 {
            font-size: 2rem;
          }
          p {
            font-size: 1rem;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Welcome to CareerGoti</h1>
        <p>Your gateway to discover the best job opportunities.</p>
        <a href="#">Get Started</a>
      </div>
    </body>
    </html>
  `;
