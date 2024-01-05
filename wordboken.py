from flask import Flask

def create_app():
    app = Flask(__name__)
    @app.route('/')
    def index():
        return "this is the index of wordboken"
    return app

create_app().run(debug = True)
