---
name: Container Images
slug: container-images-demo
description: Containerized services built from their own Dockerfiles, running as Vercel Functions behind a single domain.
framework:
  - Next.js
  - Other
type:
  - Starter
css:
  - Tailwind
githubUrl: https://github.com/vercel/examples/tree/main/container-images/demo
demoUrl: https://container-images-demo.labs.vercel.dev
deployUrl: https://vercel.com/new/clone?repository-url=https://github.com/vercel/examples/tree/main/container-images/demo&project-name=container-images-demo&repository-name=container-images-demo
publisher: Vercel
relatedTemplates:
  - rust-axum
  - rust-websocket
  - rust-hello-world
---

# Container Images Demo

A collection of containerized services running as [Vercel Functions](https://vercel.com/docs/functions), each built from its own `Dockerfile` and routed through a single [`vercel.json`](./vercel.json). It showcases the Vercel Dockerfile runtime alongside the native Next.js runtime — twenty independent services sharing one domain.

## Demo

https://container-images-demo.labs.vercel.dev

## Services

| Service | Route | Stack | Description |
| --- | --- | --- | --- |
| **web** | `/` | Next.js 16, React 19, Tailwind v4 | Landing page linking to every service (native `nextjs` framework, no Dockerfile). |
| **rust** | `/rust` | Rust, axum, tokio | Dynamic HTTP server. |
| **go** | `/go` | Go stdlib `net/http` | Lightweight server on a distroless image. |
| **wasm** | `/wasm` | Rust → WebAssembly, nginx | Static site running a Rust-compiled WASM module in the browser. |
| **browser** | `/browser` | Go, chromedp, headless Chromium | Streams live page-load status over WebSocket and returns a screenshot. |
| **ffmpeg** | `/ffmpeg` | Go, ffmpeg | Transforms media (gif, thumbnail, mp4, mp3, waveform) with live progress over WebSocket. |
| **doom** | `/doom` | Go, Xvfb, chocolate-doom, ffmpeg | Playable Doom streamed as MJPEG over WebSocket with keyboard/mouse input. |
| **qr** | `/qr` | Go, go-qrcode | Stateless QR code generator with an optional centered logo. |
| **php** | `/php` | Laravel 12, dompdf | Stateless PDF invoice generator. |
| **python-fastapi** | `/python-fastapi` | FastAPI, Uvicorn | Typed async Python API. |
| **python-flask** | `/python-flask` | Flask, Gunicorn | Minimal Flask service. |
| **python-starlette** | `/python-starlette` | Starlette, Uvicorn | Lightweight ASGI service. |
| **python-django** | `/python-django` | Django, Gunicorn | Django web application. |
| **python-django-notes** | `/python-django-notes` | Django | Notes application. |
| **python-django-rest-framework** | `/python-django-rest-framework` | Django REST Framework | REST API service. |
| **python-flask2** | `/python-flask2` | Flask | Flask example variant. |
| **python-flask3** | `/python-flask3` | Flask | Flask example variant. |
| **python-hello-world** | `/python-hello-world` | Flask, Gunicorn | Minimal Python container. |
| **python-celery** | `/python-celery` | Flask, Celery | Task worker pattern. |
| **python-queue-subscribers** | `/python-queue-subscribers` | FastAPI | Queue subscriber health service. |
| **python-litellm-gateway** | `/python-litellm-gateway` | LiteLLM, FastAPI | Model gateway example. |
| **python-vibe-coding-ide** | `/python-vibe-coding-ide` | FastAPI | IDE backend service. |

## How It Works

Each service is self-contained — it serves its own UI and its own API/WebSocket endpoints under its path prefix. There is no API gateway: `vercel.json` declares each service and uses `rewrites` to route requests by path. The `web` service is a static directory page; a final catch-all rewrite sends all other traffic to it.

```jsonc
{
  "services": {
    "rust": { "root": "apps/rust", "entrypoint": "Dockerfile" },
    // ...other Dockerfile services
    "web": { "root": "apps/web", "framework": "nextjs" }
  },
  "rewrites": [
    { "source": "/rust/(.*)", "destination": { "service": "rust" } },
    { "source": "/rust", "destination": { "service": "rust" } },
    // ...other service routes
    { "source": "/(.*)", "destination": { "service": "web" } }
  ]
}
```

## How to Use

You can choose from one of the following two methods to use this repository:

### One-Click Deploy

Deploy the example using [Vercel](https://vercel.com?utm_source=github&utm_medium=readme&utm_campaign=vercel-examples):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/vercel/examples/tree/main/container-images/demo&project-name=container-images-demo&repository-name=container-images-demo)

### Clone and Deploy

```bash
git clone https://github.com/vercel/examples/tree/main/container-images/demo
```

Install the Vercel CLI:

```bash
npm i -g vercel
```

Then run the app at the root of the repository:

```bash
vercel dev
```
