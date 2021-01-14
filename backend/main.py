from flask import Flask
from flask import request
import json
import pandas as pd
import numpy as np

from algo.main import getHost

app = Flask(__name__ ,
            static_url_path='',
            static_folder='buildd',
            template_folder='web/templates')


@app.route("/")
def root():
    return app.send_static_file('indexx.html')


@app.route("/getServicePlacement")
def getServicePlacement():
    ram = request.args.get('ram')
    disk = request.args.get('disk')
    id = getHost(int(ram),int(disk))
    ram = 0
    disk = 0
    Hosts = []
    Host = {}
    Host['HostID'] = id
    Hosts.append(Host)

    
    response = app.response_class(
        response=json.dumps(Hosts),
        mimetype='application/json'
    )
    return response

if (__name__ == "__main__"):
    app.run(port=8083)
