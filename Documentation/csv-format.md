# CSV format definition:

#### Directory format:
|Ending| Type|
|-|-|
|.csv | File|
|No line ending | Directory|

* Data
    * Views.CSV
    * Special nodes
        * SpecialNodes1.CSV
        * SpecialNodes2.CSV
        * ...
        * SpecialNodesN.CSV
    * Nodes
        * Nodes.CSV
        * Roles.CSV

#### Views Format:
This allows for all special node files to be counted easily and for them to be related to a specific view (1, 2 or 3)
This way we can check the nodes file has the right number of columns.


|View |Filename     |
|-----|-------------|
|View1|SpecialNodes1|
|View2|SpecialNodes2|
|...  |...          |
|     |SpecialNodesN|


#### SpecialNodes format:

Each special node file is added to the views so that it is indexed.

There should be a column for every one in the nodes files, such that every node can list the special nodes of each type it is connected to.

Also if different files have the same name of a group in them they will be in different columns and therefore be easy to differentiate.

|Name      |Media Link                |Site Name |Site Link           |Bio                     |
|----------|--------------------------|----------|--------------------|------------------------|
|Group     |Youtube Link              |Sign Up   |www.SignUpToUs.co.nz|We are...               |
|Best Group|Vimeo.com/weUseVimeo      |          |                    |                        |
|otherGroup|linkTo.com/ProfilePic.jpg |          |www.otherGroup.com  |ToDo: write description |
|A Group   |                          |          |                    |Hello World             |

#### Roles format:
Lists of the possible roles.

|Role  |
|------|
|Type 1|
|Type 2|
|Type 3|
|Type 4|
|Type 5|

#### Nodes format:
This data includes all the details specific to the node and its details pane.
It also columns specific to each Special node file.
Note: While the Special nodes have the same name, because they are in different type columns they are different groups.
The column labelled Department (columns 2) is designed to take the name at the top of the column and use that terminology in the website UI.


###### Without details:

|Name |...|Role |Collaborators |SpecialNodes1 connections |SpecialNodes2 connections |... |SpecialNodes n connections |
|-----|---|-----|--------------|--------------------------|--------------------------|----|---------------------------|
|Name1|   |Type 1 |First & Last Name, Another Name |Best Group |otherGroup |...|...|
|Another Name |   |Type 3 |First & Last Name, Mr/Miss Name |Other group |   |...|...|
|First & Last Name |   |Type 5 |Name1 |   |   |...|...|
|Mr/Miss Name |   |Type 1 |   |   |Best Group |...|...|

###### With Details:

|Name |Department |Email |Staff Site Link |Site Name |Site Link |Media Link |Bio |Role |Collaborators |SpecialNodes1 connections |SpecialNodes2 connections |... |SpecialNodes n connections |
|-----|-----------|------|----------------|----------|----------|-----------|----|-----|--------------|--------------------------|--------------------------|----|---------------------------|
|Name1|Software Development |Name1@hotmail.com |www.myCompany.com/Name1 |Name1s Site |www.name1.com |www.myCompany.com/Name1.jpg |I am name 1 |Type 1 |First & Last Name, Another Name |Best Group |OtherGroup |...|...|
|Another Name |Software Development |   |www.myCompany.com/AnotherName |   |www.myCompany.com/AnotherName|www.twitterer.com/anonName |Check my twiterer |Type 3 |First & Last Name, Mr/Miss Name |Other group |   |...|...|
|First & Last Name |   |LastnameFirstname@gmail.com |   |   |   |   |I've been a type 5 for many years |Type 5 |Name1 |   |   |...|...|
|Mr/Miss Name |Sales |   |   |Site |www.mr/miss.com |faceboooook.com/me |I work on... |Type 1 |   |   |Best Group |...|...|
