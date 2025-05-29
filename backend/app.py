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
    if not name:
        return jsonify({"error": "Task name is required"}), 400

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO tasks (name, count) VALUES (%s, 1)", (name,))
    conn.commit()
    conn.close()
    return jsonify({"message": "Task added!"}), 201

@app.route('/tasks/<int:task_id>/increment', methods=['POST'])
def increment_task(task_id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("UPDATE tasks SET count = count + 1 WHERE id = %s", (task_id,))
    if not cursor.rowcount:
        return jsonify({"error": "Task with the given ID does not exist"}), 404
    conn.commit()
    conn.close()
    return jsonify({"message": "Task incremented!"}), 200

@app.route('/tasks/<int:task_id>/decrement', methods=['POST'])
def decrement_task(task_id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("UPDATE tasks SET count = CASE WHEN count > 1 THEN count - 1 ELSE 0 END WHERE id = %s", (task_id,))
    if not cursor.rowcount:
        return jsonify({"error": "Task with the given ID does not exist"}), 404
    conn.commit()
    conn.close()
    return jsonify({"message": "Task decremented!"}), 200

@app.route('/tasks/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM tasks WHERE id = %s", (task_id,))
    if not cursor.rowcount:
        return jsonify({"error": "Task with the given ID does not exist"}), 404
    conn.commit()
    conn.close()
    return jsonify({"message": "Task deleted!"}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
