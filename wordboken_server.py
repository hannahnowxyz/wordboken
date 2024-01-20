import flask
import shutil

def create_app():
    app = flask.Flask(__name__)
    #TODO will this "template" ever have anything in it?
    @app.route("/")
    def render_and_serve_index():
        return flask.render_template("index.html")
    @app.route("/files/<path:filepath>")
    def serve_file(filepath):
        return flask.send_from_directory("files", filepath)
    return app

if __name__ == "__main__":
    print("zipping contents of emfs_prezip to files/emfs.zip")
    shutil.make_archive("files/emfs", "zip", "emfs_prezip")
    create_app().run(debug = True)
