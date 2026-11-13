
from flask import Flask, jsonify
from flask_cors import CORS

from database.db import initialize_database
from routes.services import services_bp
from routes.offices import offices_bp
from routes.announcements import announcements_bp


# Create Flask application
app = Flask(__name__)

# Allow React frontend to communicate with Flask
CORS(app)
app.register_blueprint(services_bp)
app.register_blueprint(offices_bp)
app.register_blueprint(announcements_bp)


# Initialize SQLite database
initialize_database()


# Health check API
@app.route("/api/health", methods=["GET"])
def health_check():
    return jsonify({
        "success": True,
        "data": {
            "status": "running"
        },
        "message": "SevaConnect backend is running"
    }), 200


if __name__ == "__main__":
    app.run(debug=True, port=5000)
