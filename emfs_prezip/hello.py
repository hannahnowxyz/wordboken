import os
import sys
import js

print(\
    "hello from hello.py:" + "<br/>" +\
    "<div class=\"text-output-list\">" +\
        "this is python " + " ".join(sys.version.split()[:6]) + "<br/>" +\
        "running on " + sys.platform + "<br/>" +\
        "as __name__ ==" + __name__ +\
    "</div>"\
    )
print(\
    "emfs root:" + "<br/>" +\
    "<div class=\"text-output-list\">" +\
        ("<br/>".join(os.listdir())).rstrip() +\
    "</div>"\
    )
js.createDiv("hello from js global namespace from hello.py")
