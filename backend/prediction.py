import matplotlib.pyplot as plt
from pandas import read_csv
import pandas as pd
from matplotlib import pyplot
import statsmodels
from statsmodels.tsa.stattools import adfuller
from statsmodels.tsa.arima_model import ARIMA
import numpy as np
import csv
import itertools


#get data
def GetData():
    ActualData = pd.read_csv('C:\Users\umuhabh\Desktop\Kushi\Lecture Materials\RESEARCH\Energy_usage.csv',index_col=0)
    NumberOfElements = len(ActualData)
    TrainingSize = int(NumberOfElements * 0.7)
    TrainingData = ActualData[0:TrainingSize]
    TestData = ActualData[TrainingSize:NumberOfElements]
    return TrainingData


def Test():
    f = open('C:\Users\umuhabh\Desktop\Kushi\Lecture Materials\RESEARCH\Energy_usage.csv')
    csv_f = csv.reader(f)


    for row in csv_f:
      #print row[1]

      instances = []
      ins = {}
      ins['label'] = row[1]
      instances.append(ins)
      print instances



def reader():
    f = open('C:\Users\umuhabh\Desktop\Kushi\Lecture Materials\RESEARCH\DATA SETS\list.csv')
    csv_f = csv.reader(f)

    for row in csv_f:

        data1=row[0].split("-")
        print(data1)
        data2=row[1].split("-")
        print(data2)

        if(data1[0]=='s3' and data2[0]=='s4'):
                print(row[2])

                with open("scalable_decoding_time1.csv", "a") as csv_file:
                     writer = csv.writer(csv_file, delimiter=',')

                     traffic = row[3]
                     time ='01/10/2019'
                     writer.writerow((traffic, time))

reader()

def test1():
    f = open('C:\Users\umuhabh\Desktop\Kushi\Lecture Materials\RESEARCH\DATA SETS\DataSet2.csv')
    csv_f = csv.reader(f)
    for row in itertools.islice(csv_f, 20):
        print(row[6])


#Function that calls ARIMA model to fit and forecast the data
def StartARIMAForecasting(Actual, P, D, Q):
	model = ARIMA(Actual, order=(P, D, Q))
	model_fit = model.fit(disp=0)
	prediction = model_fit.forecast()[0]
	return prediction
