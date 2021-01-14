import math
import random

def WMAlgo(weightMatrix,realValues,req_RAMmemory,req_DiskCapacity):
    numberOfWeights = len(weightMatrix)
    numberOfHost = len(realValues)
    sumOfWeights = sum(weightMatrix)
    max_probability = 0
    probabilities = []

    for expertHost in range(0, numberOfHost):
        probability = float(sumOfWeights)/numberOfWeights
        probabilities.append(probability)
    id = 0
    probabilities = []
    for expertHost in range(0, numberOfHost):
        val = 0
        for values in range(1,numberOfWeights+1):
            if values == 2:
                realValues[expertHost][values] = realValues[expertHost][values]*-1
            if values == 3:
                ram = realValues[expertHost][values]
                if realValues[expertHost][values] <= req_RAMmemory:
                    realValues[expertHost][values] = 0
            if values == 4:
                disk = realValues[expertHost][values]
                if realValues[expertHost][values] <= req_DiskCapacity:
                    realValues[expertHost][values] = 0

            val += (realValues[expertHost][values])*(weightMatrix[values-1])
        probabilities.append((val/sumOfWeights))

        if max_probability < probabilities[expertHost]:
            if ram >= req_RAMmemory and disk >= req_DiskCapacity:
                max_probability = probabilities[expertHost]
                id = realValues[expertHost][0]
            elif id == 0:
                id = "No any valid server, need to up a new server"

    #print(max_probability)
    return id


