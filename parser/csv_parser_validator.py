import csv_parser_file_functions

def validate_data(specialNodes,normalNodes,modifierNodes, numberOfSpecialNodes,lastDetailsFieldIndex,specialFN,nodesFN,viewsFN):
    if not check_case1(specialNodes,normalNodes,lastsDetailsFieldIndex,numberOfSpecialNodes):
        return false

    if not check_case2(specialNodes,normalNodes):
        return false

    if not check_case3(normalNodes,modifierNodes):
        return false

    if not check_case4(specialNodes,normalNodes,modifierNodes):
        return false

    if not check_case5(normalNodes,modifierNodes):
        return false

    # passes all cases. meaning data is valid
    return True


# check if nodes.csv has same amount special node columns as number of special node files
# node.csv should always have "lastsDetailsFieldIndex" amount of fields reserved for name and details
def check_case1(specialNodes,normalNodes, lastDetailsFieldIndex, numberOfSpecialNodes):
    # get path details to open file
    nodesFileName = nodesFN[0]
    path = 'data/nodes/'

    # get fields names inside nodes.csv
    metaData = fetch_metadata(nodesFileName,path)

    # trim off name and details to see the left over fields
    trimPoint = 1 + lastDetailsFieldIndex   # plus one because of names
    specialNodeColumns = metaData[trimPoint:]

    # check if left over fields are equivalent to number of special nodes
    if len(specialNodeColumns) == numberOfSpecialNodes:
        return true

    # failed use case 1
    return false



# check if special node values in node.csv is a valid entry in special nodes
def check_case2(specialNodes,normalNodes):


# check if all names of nodes and roles are unique
def check_case3(normalNodes,modifierNodes):


# check if all files have correct schema. so they should right number of columns and column names
def check_case4(specialNodes,normalNodes,modifierNodes):


# check if roles column values in node.csv matches in roles.csv
def check_case5(normalNodes,modifierNodes):


# gets the metadata of the file
def fetch_metadata(filename,path):
    return extractFileIntoList(filename,path)[1]
