FROM python:3.12-slim
WORKDIR /app
COPY . .
RUN pip install --no-cache-dir flask gunicorn
ENV PYTHONUNBUFFERED=1
CMD ["sh", "-c", "gunicorn --bind 0.0.0.0:${PORT:-8000} api.index:app"]
