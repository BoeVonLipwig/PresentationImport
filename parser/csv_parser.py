import sys
import csv

class Node:
    # webLink -> "hdawuidhaw.com"
    # bio -> "adawoiudoiudb"
    def __init__(self, id, name, fields):
        self.id = id
        self.name = name
        self.fields = fields

    def equals(self, other):
        return self.name == other.name

    def __repr__(self):
        return "ID: %d \nName: %s\nFields: %s\n\n" % (self.id,self.name,self.fields)


class Edge:
    def __init__(self, id, node1, node2):
        self.id = id
        self.node1 = node1
        self.node2 = node2

    def equals(self, other):
        return (self.node1 == other.node1 and self.node2 == other.node2) or (self.node1 == other.node2 and self.node2 == other.node1)

    def __repr__(self):
        return "ID: %d\nNode1: %s\nNode2: %s\n\n" % (self.id,self.node1,self.node2)


def getFileNames():
    filenames = [arg for arg in sys.argv]
    del filenames[0] # first entry is parser name
    return filenames


def extractFileIntoList(file):
    with open(file,'r') as f:
        reader = csv.reader(f)
        instances = list(reader)
    return instances[1:], instances[0]


def createNodesFromFile(ID,file):
    nodes = list()
    instances,metaData = extractFileIntoList(file)
    for i in instances:
        name = i[0]
        fields = dict(zip(metaData[1:], i[1:]))
        nodes.append(Node(ID,name,fields))
        ID+=1

    print(metaData)
    print(nodes[0])



def createNodes(fn):
    ID = 1
    for file in fn:
        createNodesFromFile(ID,file)


def loadData():
    filenames = getFileNames()
    nodes = createNodes(filenames)

    # check validity of data


    # Create edge objects


def formatForCytoscape():
    print("stub")


def generateOutputFile():
    print("stub")


if __name__ == '__main__':
    loadData()
    # formatForCytoscape()
    # generateOutputFile()
