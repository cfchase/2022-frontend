## Docker

### Frontend

Build Docker container

```bash
docker build -t rhdemo/2022-game-app -f Dockerfile.frontend .
```

Run Docker container

```bash
docker run -it --rm -p 80:80 rhdemo/2022-game-app
```

You can access the app at `http://localhost`

You can access the demo at `http://localhost/demo.html`

## Environment Variables

```
BACKEND_ENDPOINT=ws://0.0.0.0:8080/graphql
```

### Backend
Build Docker container

```bash
docker build -t rhdemo/2022-game-app-backend -f Dockerfile.backend .
docker run -it --rm -p 8080:8080 rhdemo/2022-game-app-backend
```

Run Docker container

```bash
docker run -it --rm -p 8080:8080 rhdemo/2022-game-app-backend
```
