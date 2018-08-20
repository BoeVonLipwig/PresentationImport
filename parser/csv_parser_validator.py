from csv_parser_file_functions import *

def validate_data(specialNodes,normalNodes,modifierNodes, numberOfSpecialNodes,lastDetailsFieldIndex,specialFN,nodesFN,viewsFN):
    if not check_case1(specialNodes,normalNodes,lastDetailsFieldIndex,numberOfSpecialNodes,nodesFN):
        print("case1 failed")
        return False

    if not check_case2(specialNodes,normalNodes):
        print("case2 failed")
        return False

    if not check_case3(normalNodes,modifierNodes):
        print("case3 failed")
        return False

    if not check_case4(specialNodes,normalNodes,modifierNodes):
        print("case4 failed")
        return False

    if not check_case5(normalNodes,modifierNodes):
        print("case5 failed")
        return False

    # passes all cases. meaning data is valid
    return True


# check if nodes.csv has same amount special node columns as number of special node files
# node.csv should always have "lastDetailsFieldIndex" amount of fields reserved for name and details
def check_case1(specialNodes,normalNodes, lastDetailsFieldIndex, numberOfSpecialNodes,nodesFN):
    # get path details to open file
    nodesFileName = nodesFN[0]
    path = 'data/nodes/'

    # get fields names inside nodes.csv
    metaData = fetch_metadata(nodesFileName,path)

    # trim off name and details to see the left over fields
    trimPoint = 3 + lastDetailsFieldIndex   # plus three because of names, roles, and collab field
    specialNodeColumns = metaData[trimPoint:]

    # check if left over fields are equivalent to number of special nodes
    if len(specialNodeColumns) == numberOfSpecialNodes:
        return True

    # failed use case 1
    return False



# check if special node values in node.csv is a valid entry in special nodes
def check_case2(specialNodes,normalNodes):
    return False
    # set up variables


    # go through every normal node


# check if all names of nodes and roles are unique
def check_case3(normalNodes,modifierNodes):
    return False

# check if all files have correct schema. so they should right number of columns and column names
def check_case4(specialNodes,normalNodes,modifierNodes):
    return False


# check if roles column values in node.csv matches in roles.csv
def check_case5(normalNodes,modifierNodes):
    return False



# gets the metadata of the file
def fetch_metadata(filename,path):
    return extractFileIntoList(filename,path)[1]
