FROM python:3.12-slim
WORKDIR /app
COPY pyproject.toml .
RUN pip install --no-cache-dir django djangorestframework gunicorn
COPY . .
ENV PYTHONUNBUFFERED=1
CMD ["sh", "-c", "python manage.py migrate --noinput && gunicorn --bind 0.0.0.0:${PORT:-8000} config.wsgi:application"]
