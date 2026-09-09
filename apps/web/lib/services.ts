import type { ComponentType, SVGProps } from "react";
import {
  ChromeIcon,
  DoomIcon,
  FfmpegIcon,
  GoIcon,
  LaravelIcon,
  QrIcon,
  RustIcon,
  WasmIcon,
  PythonIcon,
} from "./icons";

export type Service = {
  name: string;
  route: string;
  description: string;
  tags: string[];
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
};

export const services: Service[] = [
  {
    name: "Rust",
    route: "/rust",
    description:
      "A dynamic HTTP server built with axum and tokio, returning a server-rendered page.",
    tags: ["axum", "tokio", "dynamic"],
    Icon: RustIcon,
  },
  {
    name: "Go",
    route: "/go",
    description:
      "A lightweight server using the Go standard library net/http with an embedded page.",
    tags: ["net/http", "stdlib", "dynamic"],
    Icon: GoIcon,
  },
  {
    name: "WebAssembly",
    route: "/wasm",
    description:
      "A static site served by nginx that runs Rust-compiled WebAssembly directly in your browser.",
    tags: ["rust to wasm", "nginx", "static"],
    Icon: WasmIcon,
  },
  {
    name: "Browser",
    route: "/browser",
    description:
      "Headless Chromium in a container. Enter a URL and get a screenshot with live status over WebSocket.",
    tags: ["chromedp", "websocket", "chromium"],
    Icon: ChromeIcon,
  },
  {
    name: "FFmpeg",
    route: "/ffmpeg",
    description:
      "Paste a media URL, pick a transform (GIF, MP4, MP3, thumbnail, waveform) and watch ffmpeg run live.",
    tags: ["ffmpeg", "websocket", "media"],
    Icon: FfmpegIcon,
  },
  {
    name: "Doom",
    route: "/doom",
    description:
      "FreeDOOM running headless under Xvfb. Frames stream over WebSocket and your keystrokes drive the engine.",
    tags: ["xvfb", "websocket", "chocolate-doom"],
    Icon: DoomIcon,
  },
  {
    name: "QR",
    route: "/qr",
    description:
      "Generate Vercel-branded QR codes with the triangle in the center. Stateless, instant, cacheable.",
    tags: ["go-qrcode", "image", "stateless"],
    Icon: QrIcon,
  },
  {
    name: "PHP",
    route: "/php",
    description:
      "A Laravel app that renders Blade templates to PDF invoices with dompdf. Stateless render-and-return.",
    tags: ["laravel", "dompdf", "stateless"],
    Icon: LaravelIcon,
  },
  {
    name: "Python FastAPI",
    route: "/python-fastapi",
    description: "A typed async API built with FastAPI and Uvicorn.",
    tags: ["python", "fastapi", "uvicorn"],
    Icon: PythonIcon,
  },
  {
    name: "Python Flask",
    route: "/python-flask",
    description: "A minimal Flask application packaged as a production container.",
    tags: ["python", "flask", "gunicorn"],
    Icon: PythonIcon,
  },
  {
    name: "Python Starlette",
    route: "/python-starlette",
    description: "A lightweight ASGI service using Starlette.",
    tags: ["python", "starlette", "asgi"],
    Icon: PythonIcon,
  },
  {
    name: "Python Django",
    route: "/python-django",
    description: "A Django project served with Gunicorn inside its own image.",
    tags: ["python", "django", "gunicorn"],
    Icon: PythonIcon,
  },
  {
    name: "Django Notes",
    route: "/python-django-notes",
    description: "A Django notes application with a persistent web surface.",
    tags: ["python", "django", "notes"],
    Icon: PythonIcon,
  },
  {
    name: "Django REST Framework",
    route: "/python-django-rest-framework",
    description: "A REST API built with Django REST Framework.",
    tags: ["python", "drf", "api"],
    Icon: PythonIcon,
  },
  {
    name: "Python Flask 2",
    route: "/python-flask2",
    description: "A second Flask example from the Python collection.",
    tags: ["python", "flask", "variant"],
    Icon: PythonIcon,
  },
  {
    name: "Python Flask 3",
    route: "/python-flask3",
    description: "A third Flask example from the Python collection.",
    tags: ["python", "flask", "variant"],
    Icon: PythonIcon,
  },
  {
    name: "Python Hello World",
    route: "/python-hello-world",
    description: "The smallest Python container service in the collection.",
    tags: ["python", "flask", "hello world"],
    Icon: PythonIcon,
  },
  {
    name: "Python Celery",
    route: "/python-celery",
    description: "A Flask service paired with a Celery task worker pattern.",
    tags: ["python", "celery", "tasks"],
    Icon: PythonIcon,
  },
  {
    name: "Python Queue Subscribers",
    route: "/python-queue-subscribers",
    description: "A queue subscriber service exposing an HTTP health surface.",
    tags: ["python", "queues", "subscriber"],
    Icon: PythonIcon,
  },
  {
    name: "LiteLLM Gateway",
    route: "/python-litellm-gateway",
    description: "A Python model gateway packaged for container deployment.",
    tags: ["python", "litellm", "gateway"],
    Icon: PythonIcon,
  },
  {
    name: "Vibe Coding IDE",
    route: "/python-vibe-coding-ide",
    description: "A Python backend service for the Vibe Coding IDE example.",
    tags: ["python", "fastapi", "ide"],
    Icon: PythonIcon,
  },
  {
    name: "json-render",
    route: "/json-render",
    description: "A constrained generative UI showcase powered by the Vercel Labs json-render framework.",
    tags: ["generative UI", "react", "container"],
    Icon: PythonIcon,
  },
];
