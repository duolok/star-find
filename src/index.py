from flask import Flask, render_template
from flask import request, jsonify
from astar import astar
from parser import parse_grid

app = Flask(__name__, template_folder = '../templates/', static_folder='../templates/static/')

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/', methods=["POST"])
def handle_grid_data():
    try:
        data = request.get_json()
        start, end, matrix, obstacles = parse_grid(data)
        path = astar(start, end, matrix, obstacles)
        return jsonify({"path": path}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    app.run(debug=True)
