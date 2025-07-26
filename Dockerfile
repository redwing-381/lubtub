# Use official Python image with a slim footprint
FROM python:3.10-slim

# Install system packages (optional: build‑essentials for some libs)
RUN apt-get update && apt-get install -y build-essential && rm -rf /var/lib/apt/lists/*

# Set work directory
WORKDIR /app

# Copy backend requirements and install them
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the backend source into the container
COPY backend /app

# Note: Cloud Run will inject GOOGLE_API_KEY via environment variables
# No .env file is needed for production deployment

# Expose port 8080 – Cloud Run listens on this port by default
EXPOSE 8080

# Start the FastAPI application using Uvicorn
CMD ["uvicorn", "app.main:app", "--host=0.0.0.0", "--port=8080"] 