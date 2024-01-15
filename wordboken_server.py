import flask

def create_app():
    app = flask.Flask(__name__)
    @app.route("/")
    def render_and_serve_index():
        return flask.render_template("index.html")
    @app.route("/files/<path:filepath>")
    def serve_file(filepath):
        return flask.send_from_directory("files", filepath)
    return app

if __name__ == "__main__":
    create_app().run(debug = True)
