from flask import Flask, render_template
from flask import request, jsonify
from astar import astar

app = Flask(__name__, template_folder = '../templates/', static_folder='../templates/static/')

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/', methods=["POST"])
def handle_grid_data():
    try:
        data = request.get_json()
        print("WORK WITH DATA")
        respone_data = {"message" : "Grid data received and processed"}
        return jsonify(respone_data), 200   
    except:
        return jsonify({"error" : str("error")}), 400

if __name__ == "__main__":
    app.run(debug=True)
