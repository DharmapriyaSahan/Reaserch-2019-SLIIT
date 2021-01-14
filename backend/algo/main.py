import pandas as pd
import numpy as np

from algo.WMAlgorithm import WMAlgo


def getHost(ram,disk):
    # data2 = pd.read_csv('./book.csv')
    # names = data2['PM']


    data = pd.read_csv('./algo/book.csv',skiprows=1)
    #print(data)
    data=np.array(data)

    #features = (data - np.min(data)) / (np.max(data) - np.min(data))
    #print(features)
    #realValues = [['h1',2600,1680,4096,1000000,5],['h2',260,2514,10004,10000000,7],['h3',2600,3320,10004,1000000,5]];
    realValues = data

    #pre-predicted weights
    weightMatrix = [0.25,0.05,0.4,0.2,0.1];



    id = WMAlgo(weightMatrix,realValues,ram,disk);  #4099,90000);

    return id #print("Most suitable PM_ID: "+id);


