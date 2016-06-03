$(function () { // on dom ready
    var numnodes = 0;
    var numedges = 0;
    var selectedArray = [];
    var selectedEdge = [];
    var jsonArray = [];
    var jsonCounter = 0;
   
    function hideMenus() {
        document.getElementById("cyside").style.display = "none";
        document.getElementById("changeProp").style.display = "none";
		 document.getElementById("infoDiv").style.display = "none";
		 document.getElementById("edgeSide").style.display = "none";
    }
    $("#createnode").click(function () {
       hideMenus();
        document.getElementById("cyside").style.display = "inline";
    });
    
    
    $("#button2").click(function () {
        numnodes = cy.nodes().length;
        var obj = document.getElementById("mySelect"); 
        var animal = obj.options[obj.selectedIndex].text;

        switch (animal) {
            case 'Tumor':
                var imageurl = 'http://i.imgur.com/7UT3Gni.jpg';
                break;
            case 'NK Cell':
                var imageurl = 'http://i.imgur.com/Ka1ZNEV.jpg';
                break;
            case 'CD8+ Treg':
                var imageurl = 'http://i.imgur.com/S3V4ZHe.jpg';
                break;
            case 'MSDC':
                var imageurl = 'http://i.imgur.com/LsQ4VvR.jpg';
                break;
            case 'Progenitor':
                var imageurl = 'http://i.imgur.com/oemrbKI.jpg';
                break;
            case 'CD4+ Treg':
                var imageurl = 'http://i.imgur.com/6lV1NcE.png';
                break;
            case 'Macrophage':
                var imageurl = 'http://i.imgur.com/PmwD9Uk.png';
                break;
            case 'TAM(M2)':
                var imageurl = 'http://i.imgur.com/bBniyqZ.png';
                break;
            case 'Activated DC':
                var imageurl = 'http://i.imgur.com/cq933BS.png';
                break;
            case 'DC':
                var imageurl = 'http://i.imgur.com/iWtYZYV.png';
                break;
            case 'Regulatory DC':
                var imageurl = 'http://i.imgur.com/7u6IWSA.png';
                break;
            case 'CD4+ T Cell':
                var imageurl = 'http://i.imgur.com/tSbbFi7.png';
                break;
            case 'CD8+ T Cell':
                var imageurl = 'http://i.imgur.com/qr7kSYC.png';
                break;
            default:
                var imageurl = 'http://i.imgur.com/7UT3Gni.jpg';
        }
        cy.add([{ group: "nodes", data: { id: "n" + numnodes, name: animal, type: animal }, position: { x: 550, y: 250 } }]);
        //   cy.nodes()[numnodes].css("background-image", "" + imageurl)
        cy.style()
       .selector('#n' + numnodes)
         .css({
             'background-image': imageurl
         })
        .update();
        numnodes++;
        jsonArray.splice(jsonCounter + 1, jsonArray.length - jsonCounter);
        unhighlightall();
        savestate();
    });

    $("#confirmType").click(function () {
        
        var obj = document.getElementById("mySelectType");
        var animal = obj.options[obj.selectedIndex].text;

        switch (animal) {
            case 'Tumor':
                var imageurl = 'http://i.imgur.com/7UT3Gni.jpg';
                break;
            case 'NK Cell':
                var imageurl = 'http://i.imgur.com/Ka1ZNEV.jpg';
                break;
            case 'CD8+ Treg':
                var imageurl = 'http://i.imgur.com/S3V4ZHe.jpg';
                break;
            case 'MSDC':
                var imageurl = 'http://i.imgur.com/LsQ4VvR.jpg';
                break;
            case 'Progenitor':
                var imageurl = 'http://i.imgur.com/oemrbKI.jpg';
                break;
            case 'CD4+ Treg':
                var imageurl = 'http://i.imgur.com/6lV1NcE.png';
                break;
            case 'Macrophage':
                var imageurl = 'http://i.imgur.com/PmwD9Uk.png';
                break;
            case 'TAM(M2)':
                var imageurl = 'http://i.imgur.com/bBniyqZ.png';
                break;
            case 'Activated DC':
                var imageurl = 'http://i.imgur.com/cq933BS.png';
                break;
            case 'DC':
                var imageurl = 'http://i.imgur.com/iWtYZYV.png';
                break;
            case 'Regulatory DC':
                var imageurl = 'http://i.imgur.com/7u6IWSA.png';
                break;
            case 'CD4+ T Cell':
                var imageurl = 'http://i.imgur.com/tSbbFi7.png';
                break;
            case 'CD8+ T Cell':
                var imageurl = 'http://i.imgur.com/qr7kSYC.png';
                break;
            default:
                var imageurl = 'http://i.imgur.com/7UT3Gni.jpg';
        }
        for (var i = 0; i < selectedArray.length; i++) {
            var node = cy.getElementById(selectedArray[i]);
            node.data("type", animal)
            cy.style()
           .selector('#' + selectedArray[i])
             .css({
                 'background-image': imageurl
             })
            .update();
        }
        savestate();
    });


    $("#colorButton").click(function () {

        var obj = document.getElementById("mySelectColor");
        var color = obj.options[obj.selectedIndex].text;
        var shapeSelect = document.getElementById("mySelectShape");
        var shape = shapeSelect.options[shapeSelect.selectedIndex].text;
        var sizeSelect = document.getElementById("mySelectSize");
        var size = sizeSelect.options[sizeSelect.selectedIndex].text;

        for (var i = 0; i < selectedArray.length; i++) {
            cy.style()
              .selector('#' + selectedArray[i])
                .css({
                    'border-color': color,
                    'shape': shape,
                    'height': size,
                    'width': size
                })
               .update();
            console.log("i:" + i);
        }
        savestate();
    });

    $("#nameChange").click(function () {
        savestate();
        var newName = prompt('Enter New Name: ');
        for (var i = 0; i < selectedArray.length; i++) {

            if (newName != null) {
                var node = cy.getElementById(selectedArray[i]);
                node.data("name", newName)
            }
        }
    });

    $("#createedge").click(function () {
       hideMenus();
    document.getElementById("edgeSide").style.display = "inline";
       
    });
    
    
    $("#makeedge").click(function () {
    	var edgeType = document.getElementById("edgeSelect");
        var edgeSelect = edgeType.options[edgeType.selectedIndex].text;
        var edgeShape;
        console.log(edgeSelect);
       if(edgeSelect == 'Activator'){
        	edgeShape = 'triangle';}
        else{
        	edgeShape = 'tee';}
        numedges = cy.edges().length;
        for (var i = 0; i < selectedArray.length - 1; i++) {
            cy.add([{ group: "edges", data: { id: "e" + numedges, name: "hi", source: "" + selectedArray[i], target: "" + selectedArray[i + 1] } }])
           cy.style()
              .selector('#' + "e" + numedges)
                .css({
                    'target-arrow-shape': edgeShape
            
                })
               .update();
            numedges++;
        }
        jsonArray.splice(jsonCounter + 1, jsonArray.length - jsonCounter);
        unhighlightall();
        savestate();
    });
    $("#confirmEdgeType").click(function () {
        var edgeType = document.getElementById("edgeType");
        var edgeSelect = edgeType.options[edgeType.selectedIndex].text;
        var edgeShape;
        if (edgeSelect == 'Straight') {
            edgeShape = 'bezier';
        }else if(edgeSelect == 'Curved') {
            edgeShape = 'unbundled-bezier';
        } else if (edgeSelect == 'Jagged') {
            edgeShape = 'segments';
        }
        for (var i = 0; i < selectedEdge.length; i++) {
            console.log(selectedEdge[i]);
            cy.style()
                .selector('#'+selectedEdge[i])
                    .css({
                        'curve-style': edgeShape,
                        'segment-distances': '40 -40',
                        'segment-weights': '0.25 0.75',
                        'control-point-distances': 150,
                        'control-point-weights': 0.1
                    })
                .update();
        }
        jsonArray.splice(jsonCounter + 1, jsonArray.length - jsonCounter);
        unhighlightall();
        savestate();
    });
    $("#confirmEdgeType").click(function () {
        var edgeType = document.getElementById("edgeType");
        var edgeSelect = edgeType.options[edgeType.selectedIndex].text;
        var edgeShape;
    });

    $("#deletenode").click(function () {
        for (var k = 0; k < selectedArray.length; k++) {
            // console.log(selectedArray[i]);
            var removeElement = cy.getElementById(selectedArray[k]);
            cy.remove(removeElement);
        }
        jsonArray.splice(jsonCounter + 1, jsonArray.length - jsonCounter);
        unhighlightall();
        savestate();
    });
    $("#deleteedge").click(function () {
        for (var k = 0; k < selectedEdge.length; k++) {
            // console.log(selectedArray[i]);
            var removeElement = cy.getElementById(selectedEdge[k]);
            cy.remove(removeElement);
        }
        jsonArray.splice(jsonCounter + 1, jsonArray.length - jsonCounter);
        unhighlightall();
        savestate();
    });
    $("#exportjson").click(function () {
        var jsonfile = cy.json();
        var jsontxt = JSON.stringify(jsonfile)
        download('jsonFile.txt', jsontxt);
    });
    $("#undo").click(function () {
        if (jsonCounter > 0) {
            jsonCounter--;
            cy.json(jsonArray[jsonCounter]);
            unhighlightall();
        }
        console.log(jsonCounter);
        console.log(jsonArray[0]);
    });
    $("#redo").click(function () {
        jsonCounter++;
        cy.json(jsonArray[jsonCounter]);
        unhighlightall();
        console.log(cy.nodes().length);
        console.log(jsonArray[0]);
    });
    $("#load").click(function () {
        var file = document.getElementById("files").files[0];
        var reader = new FileReader();
        reader.onload = function (event) {
            var contents = event.target.result;
            var filetext = contents;
            filetext = filetext.replace(/\s+/g, '');
            var filejson = JSON.parse(filetext);
            cy.json(filejson);
            selectedArray = [];
            selectedEdge = [];
            //console.log(filetext);
        };
        reader.onerror = function (event) {
            console.error("File could not be read! Code " + event.target.error.code);
        };
        console.log(reader.readAsText(file));

    });

    $("#loadrawfile").click(function () {
        var rawfile = document.getElementById("rawfiles").files[0];
        var reader = new FileReader();
        reader.onload = function (event) {
            var contents = event.target.result;
            var rawfiletext = contents;
            rawfiletext = rawfiletext.replace(/\s+/g, '');
            var rawfileArray = rawfiletext.split(';')
            console.log(rawfileArray);
            var nodetext = rawfileArray[0].replace("nodes:", "");
            var nodeArray = nodetext.split(',');
            for (var i = 0; i < nodeArray.length ; i++) {
                cy.add([{ group: "nodes", data: { id: nodeArray[i], name: nodeArray[i], type: "none" }, position: { x: 550, y: 250 } }]);
                numnodes++;
            }
            var edgetext = rawfileArray[1].replace("edges:", "");
            var edgeArray = edgetext.split(',');
            for (var k = 0; k < edgeArray.length; k += 3) {
                cy.add([{ group: "edges", data: { id: edgeArray[k], source: "" + edgeArray[k + 1], target: "" + edgeArray[k + 2] } }])
                numedges++;
            }
        };
        reader.onerror = function (event) {
            console.error("File could not be read! Code " + event.target.error.code);
        };
        reader.readAsText(rawfile)
    });

    $("#loadspray").click(function () {
        var sprayfile = prompt("Please enter spray file:");
        sprayArray = sprayfile.split(";");
        spraydataArray = [];
        sprayAttributeData = [];
        for (var i = 0; i < sprayArray.length - 1; i++) {
            spraydataArray.push(sprayArray[i].split(":"))
            sprayAttributeData.push(spraydataArray[i][1].split(","));
        }
        console.log(sprayAttributeData);
        console.log(sprayArray.length);
        for (var j = 0; j < sprayArray.length - 1; j++) {
            console.log(sprayArray.length);
            console.log(sprayAttributeData[0].length);
            for (var k = 0; k < sprayAttributeData[j].length; k += 2) {
                cy.getElementById(spraydataArray[j][0].replace(/\s+/g, '')).css(sprayAttributeData[j][k], sprayAttributeData[j][k + 1]);
            }
        }
    });
    
    $("#addGene").click(function () {
   
    var gene = document.getElementById("geneAdder").value;
    console.log(gene);
    for (var k = 0; k < selectedEdge.length; k++) {
    	   var edgeAddGene = cy.getElementById(selectedEdge[k]);
    	   var newLabel = edgeAddGene.data('name') + "\n" + gene;
    	   console.log(newLabel);
    	   edgeAddGene.data('name',newLabel);
    	}
    });

    $("#bundle").click(function () {
        var node;
        cy.add([{ group: "nodes", data: { id: "n" + numnodes, name: "n" + numnodes, type: "" }, position: { x: 550, y: 250 } }]);
        for (var i = 0; i < selectedArray.length; i++) {
            node = cy.getElementById(selectedArray[i]);
            node.move({
                parent: 'n' + numnodes
            })
        }
        unhighlightall();
        numnodes++;
    });
    
    var cy = cytoscape({
        container: document.getElementById('cy'),

        boxSelectionEnabled: false,
        autounselectify: true,

        style: cytoscape.stylesheet()
          .selector('node')
            .css({
                'height': 80,
                'width': 80,
                'background-fit': 'cover',
                'background-opacity': .5,
                'border-color': '#000',
                'border-width': 3,
                'border-opacity': 0.5,
                'content': 'data(name)'
               
            })
              .selector('$node > node')
            .css({
                'padding-top': '10px',
                'padding-left': '10px',
                'padding-bottom': '10px',
                'padding-right': '10px',
                'text-valign': 'top',
                'text-halign': 'center',
                'background-color': '#bbb',
                'shape': 'ellipse'
            })
          .selector('edge')
            .css({
            	'content': 'data(name)',
                'width': 6,
                'target-arrow-shape': 'triangle',
                'curve-style': 'bezier',
                'line-color': 'darkturquoise',
                'target-arrow-color': 'darkturquoise',
                'text-wrap': 'wrap'
                
            }),

        elements: {
            nodes: [
            ],
            edges: [
            ]
        },

        layout: {
            name: 'breadthfirst',
            directed: true,
            padding: 10
        }
    });

    cy.on('click', 'node', function (evt) {
        var node = evt.cyTarget;
        if (selectedArray.indexOf(node.id()) < 0) {
            selectedArray.push(node.id());
            highlightNode(node.id());
            //   console.log(jsonCounter);
        }
        else {
            selectedArray.splice(selectedArray.indexOf(node.id()), 1)
            unhighlightNode(node.id());
        }
        console.log(selectedArray.length);
        jsonArray.splice(jsonCounter + 1, jsonArray.length - jsonCounter);
        savestate();
    })
    cy.on('click', 'edge', function (evt) {
        var edge = evt.cyTarget;
        if (selectedEdge.indexOf(edge.id()) < 0) {
            selectedEdge.push(edge.id());
            highlightEdge(edge.id());
            console.log(edge.id());
        }
        else {
            selectedEdge.splice(selectedEdge.indexOf(edge.id()), 1)
            unhighlightEdge(edge.id());
            console.log(edge.id());
        }
        console.log(selectedEdge.length);
        for (var j = 0; j < selectedEdge.length; j++)
            console.log(selectedEdge[j]);
        jsonArray.splice(jsonCounter + 1, jsonArray.length - jsonCounter);
        savestate();
    })


    cy.on('cxttap', 'node', function (evt) {
		hideMenus();

        document.getElementById("changeProp").style.display = "inline";

    })

    cy.on('taphold', 'node', function (evt) {
		hideMenus();

        document.getElementById("infoDiv").style.display = "inline";


        var infoName = document.getElementById("name");
        var infoType = document.getElementById("type");
        var infoShape = document.getElementById("shape");
        var infoSize = document.getElementById("size");
        var infoColor = document.getElementById("color1");
        var node1 = evt.cyTarget;
        infoName.innerHTML = "Name: " + node1.data('name');
        infoType.innerHTML = "Type: " + node1.data('type');
        infoShape.innerHTML = "Shape: " + node1.css('shape');
        infoSize.innerHTML = "Size: " + node1.css('width');
        infoColor.innerHTML = "Color: " + node1.css('border-color');
        //	infoDiv.innerHTML = 'hi';

    })



    var cymenu = cytoscape({
        container: document.getElementById('cymenu'),
        boxSelectionEnabled: false,
        autounselectify: true,

        style: cytoscape.stylesheet()
        .selector('node')
          .css({
              'height': 80,
              'width': 80,
              'background-fit': 'cover',
              'border-color': '#000',
              'border-width': 3,
              'border-opacity': 0.5,
          })
        .selector('edge')
            .css({
                'width': 6,
                'target-arrow-shape': 'arrow',
                'line-color': '#ffaaaa',
                'target-arrow-color': '#ffaaaa'
            })
        .selector('#CreateNode')
            .css({
                'content': 'Create Node',
                'background-color': '#BCF5A9',
                'shape': 'rectangle',
                'height': 80,
                'width': 150
            })
            .selector('#CreateEdge')
            .css({
                'content': 'Create Edge',
                'background-color': '#BCF5A9',
                'shape': 'rectangle',
                'height': 80,
                'width': 150
            })
          .selector('#DeleteNode')
            .css({
                'content': 'Delete Node',
                'background-color': 'red',
                'shape': 'rectangle',
                'height': 80,
                'width': 150
            })
        .selector('#DeleteEdge')
            .css({
                'content': 'Delete Edge',
                'background-color': 'red',
                'shape': 'rectangle',
                'height': 80,
                'width': 150
            })
        .selector('#ExportJson')
            .css({
                'content': 'Export Json',
                'background-color': 'yellow',
                'shape': 'rectangle',
                'height': 80,
                'width': 150
            })
          .selector('#ImportJson')
            .css({
                'content': 'Import Json',
                'background-color': 'yellow',
                'shape': 'rectangle',
                'height': 80,
                'width': 150
            })
        .selector('#Undo')
            .css({
                'content': 'Undo',
                'background-color': 'yellow',
                'shape': 'rectangle',
                'height': 80,
                'width': 150
            })
        .selector('#Redo')
            .css({
                'content': 'Redo',
                'background-color': 'yellow',
                'shape': 'rectangle',
                'height': 80,
                'width': 150
            })
        .selector('#ExportSpray')
            .css({
                'content': 'Export Spray',
                'background-color': 'yellow',
                'shape': 'rectangle',
                'height': 80,
                'width': 150
            })
        .selector('#ImportSpray')
            .css({
                'content': 'Import Spray',
                'background-color': 'yellow',
                'shape': 'rectangle',
                'height': 80,
                'width': 150
            }),


        elements: {
            nodes: [
              { data: { id: 'CreateNode' }, position: { x: 0, y: 150 }, locked: true },
              { data: { id: 'CreateEdge' }, position: { x: 200, y: 150 }, locked: true },
              { data: { id: 'DeleteNode' }, position: { x: 400, y: 150 }, locked: true },
              { data: { id: 'DeleteEdge' }, position: { x: 600, y: 150 }, locked: true },
              { data: { id: 'ExportJson' }, position: { x: 800, y: 150 }, locked: true },
              { data: { id: 'ImportJson' }, position: { x: 1000, y: 150 }, locked: true },
              { data: { id: 'Undo' }, position: { x: 1200, y: 150 }, locked: true },
              { data: { id: 'Redo' }, position: { x: 1400, y: 150 }, locked: true },
              { data: { id: 'ExportSpray' }, position: { x: 1600, y: 150 }, locked: true },
              { data: { id: 'ImportSpray' }, position: { x: 1800, y: 150 }, locked: true },
            ],
            edges: [
            ]
        },
    });

    function highlightNode(nodeid) {
        cy.style()
        .selector('#' + nodeid)
                .css({
                    'border-color': 'red',
                    'border-width': 8,
                    'border-opacity': 0.5
                })
        .update();
    };

    function unhighlightNode(nodeid) {
        cy.style()
        .selector('#' + nodeid)
          .css({
              'border-color': '#000',
              'border-width': 3
          })
         .update();
    };

    function highlightEdge(edgeid) {
        cy.style()
        .selector('#' + edgeid)
                .css({
                    'line-color': 'lightcoral',
                    'width': 8,
                    'target-arrow-color': 'lightcoral'
                })
        .update();
    };
    function unhighlightEdge(edgeid) {
        cy.style()
        .selector('#' + edgeid)
          .css({
              'line-color': 'darkturquoise',
              'width': 6,
              'target-arrow-color': 'darkturquoise'
          })
         .update();
    };
    function unhighlightall() {
        for (var i = 0; i < selectedArray.length; i++)
            unhighlightNode(selectedArray[i]);
        for (var j = 0; j < selectedEdge.length; j++)
            unhighlightEdge(selectedEdge[j]);
        selectedArray = [];
        selectedEdge = [];
    }

    function savestate() {
        jsonArray.push(cy.json());
        jsonCounter++;;
    }
    function download(filename, text) {
        var pom = document.createElement('a');
        pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        pom.setAttribute('download', filename);

        if (document.createEvent) {
            var event = document.createEvent('MouseEvents');
            event.initEvent('click', true, true);
            pom.dispatchEvent(event);
        }
        else {
            pom.click();
        }
    }

})// on dom ready


function loadFileAsText() {
    var fileToLoad = document.getElementById("fileToLoad").files[0];

    var fileReader = new FileReader();
    fileReader.onload = function (fileLoadedEvent) {
        var textFromFileLoaded = fileLoadedEvent.target.result;
    };
    fileReader.readAsText(fileToLoad, "UTF-8");
}
