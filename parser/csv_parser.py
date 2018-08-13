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
        self.formatFields()

    def formatFields(self):
        for k,v in self.fields.items():
            if "," in v:
                newV = v.split(",")
                self.fields[k] = newV

    def equals(self, other):
        return self.name == other.name

    def __repr__(self):
        return "Node ID: %d \nName: %s\nFields: %s\n\n" % (self.id,self.name,self.fields)


class Edge:
    def __init__(self, id, node1, node2, type):
        self.id = id
        self.node1 = node1
        self.node2 = node2
        self.type = type

    def equals(self, other):
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
    for nn in normalNodes:
        for specialType in specialTypes:
            if type(nn.fields[specialType]) is list:
                for sn in nn.fields[specialType]:
                    edges.append(Edge(ID,sn,nn.name,specialType))
                    ID+=1
            else:
                edges.append(Edge(ID,nn.fields[specialType],nn.name, specialType))
                ID+=1
    return edges


def createNormalEdges(normalNodes):
    edges = list()
    global ID
    for n1 in normalNodes:
        for n2 in normalNodes:
            if(n1.fields['collaborators'] == n2.name):
                edges.append(Edge(ID,n1.name,n2.name,"collab"))
                ID+=1
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
    allNodes.extend(normalNodes)
    allNodes.extend(specialNodes)

    # trim .csv
    specialNames = [".".join(f.split(".")[:-1]).lower() for f in specialFN]

    # create list of keys
    keys = createKeysList(specialNames,modifierNodes)

    # check validity of data


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
              id: %s-key,
              name: %s,
              type: "key"
            }
        }""" % (key,key)

    nodesCyto = ""
    for node in nodes:
        nodesCyto = nodesCyto + """{
            group: "nodes",
            data: {
                id: %d,
                name: %s,
        """ % (node.id, node.name)

        for key,value in node.fields.items():
            nodesCyto = nodesCyto + "%s: %s," % (key, value)

        nodesCyto = nodesCyto[:-1] + "}}"

    # edgesCyto = ""
    # for edge in edges:
    #     edgesCyto = edgesCyto +

    # this.keyXPadding = 100;
    # this.keyYPadding = 50;
    #
    # this.keyBorder = this.cy.add({
    #   group: "nodes",
    #   data: { id: "keyBorder", type: "border" }
    # });
    #
    # this.cy.add({
    #   group: "nodes",
    #   data: { id: "titleKey", name: "NODE TYPE", type: "key" }
    # });
    #
    # let keyAr = [];
    # let subKeyStyles = [];
    # let keyStyles = _.filter(this.styleList.nodeStyles.type, typ => {
    #   let subKeyAr = _.filter(this.styleList.nodeStyles.subtype, styp => {
    #     return (
    #       styp.type.toLowerCase() === typ.label.toLowerCase() &&
    #       _.intersection(styp.subtype, typ.subtype).length < 1
    #     );
    #   });
    #   if (subKeyAr.length > 1) {
    #     subKeyStyles = subKeyStyles.concat(subKeyAr);
    #     return false;
    #   } else {
    #     return true;
    #   }
    # });
    #
    # keyStyles = keyStyles.concat(subKeyStyles);
    #
    # keyStyles.forEach(stl => {
    #   keyAr[keyAr.length] = {
    #     group: "nodes",
    #     data: {
    #       id: `${stl.label}-key`,
    #       name: stl.label,
    #       type: "key",
    #       role: stl.subtype[0]
    #     }
    #   };
    # });
    #
    # this.cy.add(keyAr);
    #
    # this.keys = this.cy.elements('[type = "key"]');
    # this.keys.unselectify().ungrabify();
    #
    # this.keyBorder.unselectify().ungrabify();
    #
    # let maxLabelWidthLocal = 0;
    #
    # this.keys.forEach(n => {
    #   let labelWidth = n.boundingBox({ includeLabels: true }).w;
    #
    #   if (labelWidth > maxLabelWidthLocal) {
    #     maxLabelWidthLocal = labelWidth;
    #   }
    # });
    #
    # this.maxLabelWidth = maxLabelWidthLocal
    # print("stub")


def generateOutputFile():
    print("stub")


def getFileNamesFromDirectory(dir):
    onlyfiles = [f for f in listdir(dir) if isfile(join(dir, f))]
    return onlyfiles


if __name__ == '__main__':
    nodes, edges, keys = loadData()

    formatForCytoscape(nodes, edges, keys)

    # generateOutputFile()
