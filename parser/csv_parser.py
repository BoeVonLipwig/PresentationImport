import sys
import csv
from os import listdir
from os.path import isfile, join

ID = 1

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
        return "Node ID: %d \nName: %s\nFields: %s\n\n" % (self.id,self.name,self.fields)


class Edge:
    def __init__(self, id, node1, node2):
        self.id = id
        self.node1 = node1
        self.node2 = node2

    def equals(self, other):
        return (self.node1 == other.node1 and self.node2 == other.node2) or (self.node1 == other.node2 and self.node2 == other.node1)

    def __repr__(self):
        return "Edge ID: %d\nNode1: %s\nNode2: %s\n\n" % (self.id,self.node1,self.node2)


def getFileNames():
    specialFiles = getFileNamesFromDirectory("data/specialNodes")
    nodeFiles = getFileNamesFromDirectory("data/nodes")
    views = getFileNamesFromDirectory("data")
    return specialFiles,nodeFiles,views


def extractFileIntoList(file,path):
    with open(path+file,'r') as f:
        reader = csv.reader(f)
        instances = list(reader)
    return instances[1:], instances[0]


def createKeysList(specialNodesFileNames,modifierNodes):
    keys = list()
    if type(specialNodesFileNames) is list:
        for n in specialNodesFileNames:
            keys.append(n[:-4])
    else:
        keys.append(specialNodesFileNames[:-4])

    if type(modifierNodes) is list:
        for n in modifierNodes:
            keys.append(n.name)
    else:
        keys.append(modifierNodes.name)

    return keys


def createNodesFromFile(file,path):
    nodes = list()
    global ID
    instances,metaData = extractFileIntoList(file,path)
    for i in instances:
        name = i[0]
        fields = dict(zip(metaData[1:], i[1:]))
        nodes.append(Node(ID,name,fields))
        ID+=1

    return nodes


def createNodes(fn,path):
    # check if we have more than one file
    nodes = list()
    if type(fn) is list:
        for file in fn:
            nodes.extend(createNodesFromFile(file,path))
    else:
        nodes.extend(createNodesFromFile(fn,path))

    return nodes


def checkSpecialEdges(specialNodes,normalNodes):
    edges = list()
    global ID
    for sn in specialNodes:
        for nn in normalNodes:
            if(sn.name == nn.fields['project'] or sn.name == nn.fields['school']):
                edges.append(Edge(ID,sn,nn))
                ID+=1
    return edges


def checkNormalEdges(normalNodes):
    edges = list()
    global ID
    for n1 in normalNodes:
        for n2 in normalNodes:
            if(n1.fields['collaborators'] == n2.name):
                edges.append(Edge(ID,n1,n2))
                ID+=1
    return edges


def createEdges(specialNodes,normalNodes):
    edges = list()
    global ID
    ID = 0
    # check againt special node and normal nodes
    specialEdges = checkSpecialEdges(specialNodes,normalNodes)
    if specialEdges:
        edges.extend(specialEdges)

    # check against normal node to normal node
    normalEdges = checkNormalEdges(normalNodes)
    if normalEdges:
        edges.extend(normalEdges)

    return edges


def loadData():
    # create nodes
    special,nodes,views = getFileNames()
    specialNodes = createNodes(special,'data/specialNodes/')
    normalNodes = createNodes(nodes[0],'data/nodes/')
    modifierNodes = createNodes(nodes[1],'data/nodes/')

    # create list of keys
    keys = createKeysList(special,modifierNodes)

    # check validity of data


    # Create edge objects
    edges = createEdges(specialNodes,normalNodes)
    print (edges)

    return specialNodes,normalNodes,modifierNodes,keys,edges

def formatForCytoscape():
    print("stub")


def generateOutputFile():
    print("stub")


def getFileNamesFromDirectory(dir):
    onlyfiles = [f for f in listdir(dir) if isfile(join(dir, f))]
    return onlyfiles


if __name__ == '__main__':
    loadData()
    # formatForCytoscape()
    # generateOutputFile()
