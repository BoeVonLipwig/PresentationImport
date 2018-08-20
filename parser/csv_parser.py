import sys
import csv
import csv_parser_validator
from os import listdir
from os.path import isfile, join

ID = 1

class Node:
    # webLink -> "hdawuidhaw.com"
    # bio -> "adawoiudoiudb"
    def __init__(self, id, name, fields):
        self.id = id
        self.name = name.strip()
        self.fields = fields
        self.formatFields()

    def formatFields(self):
        fieldNo = 0
        for k,v in self.fields.items():
            newV = v.strip()
            if fieldNo > 7:
                if newV == '':
                    newV = list()
                else:
                    newV = v.split(",")
                    newV = map(str.strip, newV)
                    self.fields[k] = newV
            self.fields[k] = newV
            fieldNo += 1

    def equals(self, other):
        return self.name == other.name

    def __repr__(self):
        return "Node ID: %d \nName: %s\nFields: %s\n\n" % (self.id,self.name,self.fields)


class Edge:
    def __init__(self, id, node1, node2, type):
        self.id = id
        self.node1 = node1.strip()
        self.node2 = node2.strip()
        self.type = type.strip()

    def __eq__(self, other):
        return (self.node1 == other.node1 and self.node2 == other.node2) or (self.node1 == other.node2 and self.node2 == other.node1)

    def __repr__(self):
        return "Edge ID: %d\nNode1: %s\nNode2: %s\nType: %s\n\n" % (self.id,self.node1,self.node2,self.type)


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


def createKeysList(specialNodesNames,modifierNodes):
    keys = list()
    for n in specialNodesNames:
        keys.append(n)
    for n in modifierNodes:
        keys.append(n.name)

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
    for file in fn:
        nodes.extend(createNodesFromFile(file,path))

    return nodes


def createSpecialEdges(specialNodes,normalNodes,specialTypes):
    edges = list()
    global ID
    for node in normalNodes:
        for specialType in specialTypes:
            for sNodeName in node.fields[specialType]:
                edges.append(Edge(ID,sNodeName,node.name,specialType))
                ID+=1
            del node.fields[specialType]
    return edges


def createNormalEdges(normalNodes):
    edges = list()
    global ID
    for node in normalNodes:
        for collaborator in node.fields['collaborators']:
            newEdge = Edge(ID,node.name,collaborator,"collab")
            if newEdge not in edges:
                edges.append(newEdge)
                ID+=1
        del node.fields['collaborators']
    return edges


def createEdges(specialNodes,normalNodes,specialTypes):
    edges = list()
    global ID
    # check againt special node and normal nodes
    specialEdges = createSpecialEdges(specialNodes,normalNodes,specialTypes)
    edges.extend(specialEdges)

    # check against normal node to normal node
    normalEdges = createNormalEdges(normalNodes)
    edges.extend(normalEdges)

    return edges


def loadData():
    # create nodes
    allNodes = list()
    specialFN,nodesFN,viewsFN = getFileNames()
    specialNodes = createNodes(specialFN,'data/specialNodes/')
    normalNodes = createNodes([nodesFN[0]],'data/nodes/')
    modifierNodes = createNodes([nodesFN[1]],'data/nodes/')
    allNodes.extend(specialNodes)
    allNodes.extend(normalNodes)

    # trim .csv
    specialNames = [".".join(f.split(".")[:-1]).lower() for f in specialFN]

    # create list of keys
    keys = createKeysList(specialNames,modifierNodes)

    # check validity of data
    validate_data(specialNodes,normalNodes,modifierNodes)

    # Create edge objects
    edges = createEdges(specialNodes,normalNodes,specialNames)

    return allNodes,edges,keys


def formatForCytoscape(nodes, edges, keyList):

    keyBorder = """{
                  group: "nodes",
                  data: { id: "keyBorder", type: "border" }
                }"""

    keyTitle = """{
                  group: "nodes",
                  data: { id: "titleKey", name: "NODE TYPE", type: "key" }
                }"""

    keysCyto = ""
    for key in keyList:
        keysCyto = keysCyto + """{
            group: "nodes",
            data: {
              id: "%s-key",
              name: "%s",
              type: "key"
            },
            selectable: "false",
            grabbable: "false"
        },""" % (key,key)

    nodesCyto = ""
    for node in nodes:
        nodesCyto = nodesCyto + """{
            group: "nodes",
            data: {
                id: "%d",
                name: "%s",
        """ % (node.id, node.name)

        for key,value in node.fields.items():
            nodesCyto = nodesCyto + "%s: \"%s\"," % (key, value)

        nodesCyto = nodesCyto[:-1] + "}},"

    edgesCyto = ""
    for edge in edges:
        edgesCyto = edgesCyto + """{
            group: "edges",
            data: {
                id: "%d"
                source: "%s",
                target: "%s",
                type: "%s"
            }
        },""" % (edge.id, edge.node1, edge.node2, edge.type)

    elements = '[' + keysCyto + nodesCyto + edgesCyto[:-1] + ']'

    return elements

def generateOutputFile(elements):
    path = './output.json'
    jsonFile = open(path, 'w+')
    jsonFile.write(elements)
    jsonFile.close()


def getFileNamesFromDirectory(dir):
    onlyfiles = [f for f in listdir(dir) if isfile(join(dir, f))]
    return onlyfiles


if __name__ == '__main__':
    nodes, edges, keys = loadData()

    elements = formatForCytoscape(nodes, edges, keys)

    generateOutputFile(elements)
