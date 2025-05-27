from flask import Flask, jsonify, request
from db import get_db_connection
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS to allow frontend access

@app.route('/tasks', methods=['GET'])
def get_tasks():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM tasks")
    tasks = cursor.fetchall()
    conn.close()
    return jsonify(tasks)

@app.route('/tasks', methods=['POST'])
def add_task():
    data = request.json
    name = data.get("name")

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO tasks (name, count) VALUES (%s, 1)", (name,))
    conn.commit()
    conn.close()
    return jsonify({"message": "Task added!"})

@app.route('/tasks/<int:task_id>/increment', methods=['POST'])
def increment_task(task_id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("UPDATE tasks SET count = count + 1 WHERE id = %s", (task_id,))
    conn.commit()
    conn.close()
    return jsonify({"message": "Task incremented!"})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
