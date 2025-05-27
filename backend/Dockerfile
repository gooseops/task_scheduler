# Use an official lightweight Python image
FROM python:3.12

# Set the working directory in the container
WORKDIR /app

# Copy the backend code
COPY . .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose port 5000 for Flask
EXPOSE 5000

# Run the Flask app
CMD ["python", "app.py"]
