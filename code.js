$(function () { // on dom ready
    var numnodes = 0;
    var numedges = 0;
    var selectedArray = [];
    var selectedEdge = [];
    var jsonArray = [];
    var jsonCounter = 0;
    var createNode = true;
    var changeProp = false;
    var info = false;
    // photos from flickr with creative commons license
    // document.getElementById("menu").innerHTML = "<button name=\"sayhi\">sayhi</button>";

    function hideMenus() {
        document.getElementById("cyside").style.display = "none";
        createNode = false;
        document.getElementById("changeProp").style.display = "none";
        changeProp = false;
    }
    $("#createnode").click(function () {
        document.getElementById("infoDiv").style.display = "none";

        document.getElementById("changeProp").style.display = "none";


        document.getElementById("cyside").style.display = "inline";
        createNode = true;



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
        cy.add([{ group: "nodes", data: { id: "n" + numnodes, name: animal, type: animal, parent:"" }, position: { x: 550, y: 250 } }]);
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
        numedges = cy.edges().length;
        for (var i = 0; i < selectedArray.length - 1; i++) {
            cy.add([{ group: "edges", data: { id: "e" + numedges, source: "" + selectedArray[i], target: "" + selectedArray[i + 1] } }])
            numedges++;
        }
        jsonArray.splice(jsonCounter + 1, jsonArray.length - jsonCounter);
        unhighlightall();
        savestate();
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
    $("#bundle").click(function () {
        var node;
        cy.add([{ group: "nodes", data: { id: "n" + numnodes, name: "n" + numnodes, type: "" }, position: { x: 550, y: 250 } }]);
        for (var i = 0; i < selectedArray.length; i++) {
            node = cy.getElementById(selectedArray[i]);
            node.move({
                parent: 'n'+numnodes
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
                'width': 6,
                'target-arrow-shape': 'triangle',
                'curve-style': 'bezier',
                'line-color': 'blue',
                'target-arrow-color': 'blue',
                'opacity': .5
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

        document.getElementById("infoDiv").style.display = "none";

        document.getElementById("cyside").style.display = "none";


        document.getElementById("changeProp").style.display = "inline";
        changeProp = true;


        /*  var node = evt.cyTarget;
          var choice1 = prompt("please type in what you would like to change(color, size, type, name, shape):");
          switch (choice1) {
              case 'color':
                  var choice2 = prompt("please choose a color:");
                  node.css('border-color', choice2)
                  break;
              case 'size':
                  var choice2 = prompt("please type in size(numbers only):");
                  cy.style()
                  .selector('#' + node.id())
                   .css({
                      'height': choice2,
                      'width': choice2
                     
                  })
                 .update();
                 /* node.css('height', choice2)
                  node.css('width', choice2)
                  break;
              case 'type':
                  var choice2 = prompt("please choose type(mammal, bird):");
                  node.data("type", choice2)
                  console.log(node.data('type'));
                  break;
              case 'name':
                  var choice2 = prompt("please type in a name");
                  node.data("name", choice2)
                  break;
              case 'shape':
                  var choice2 = prompt("please choose a shape( ellipse, rectangle, octagon, pentagon, triangle):");
                  node.css('shape', choice2)
                  break;
          }*/
    })

    cy.on('taphold', 'node', function (evt) {
        document.getElementById("cyside").style.display = "none";

        document.getElementById("changeProp").style.display = "none";



        document.getElementById("infoDiv").style.display = "inline";
        info = true;


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

    /* $("button").click(function createnode() {
         var imageurl = prompt("Please enter image URL:");
         cy.add([{ group: "nodes", data: { id: "n" + numnodes, name: "n" + numnodes, type: "none" }, position: { x: 900, y: 350 } }]);
         cy.nodes()[numnodes].css("background-image", "" + imageurl)
         numnodes++;
         jsonArray.splice(jsonCounter + 1, jsonArray.length - jsonCounter);
         unhighlightall();
         savestate();
     });


    /*cymenu.on('click', '#DeleteNode', function (evt) {
        console.log(selectedArray);
        for (var k = 0; k < selectedArray.length; k++) {
            // console.log(selectedArray[i]);
            var removeElement = cy.getElementById(selectedArray[k]);
            cy.remove(removeElement);
        }
        jsonArray.splice(jsonCounter + 1, jsonArray.length - jsonCounter);
        unhighlightall();
        savestate();

    })

    /*cymenu.on('click', '#CreateEdge', function (evt) {
        console.log(selectedArray);
        for (var i = 0; i < selectedArray.length - 1; i++) {
            cy.add([{ group: "edges", data: { id: "e" + numedges, source: "" + selectedArray[i], target: "" + selectedArray[i + 1] } }])
            numedges++;
        }
        jsonArray.splice(jsonCounter + 1, jsonArray.length - jsonCounter);
        unhighlightall();
        savestate();
    })

    /*cymenu.on('click', '#DeleteEdge', function (evt) {
        for (var k = 0; k < selectedEdge.length; k++) {
            // console.log(selectedArray[i]);
            var removeElement = cy.getElementById(selectedEdge[k]);
            cy.remove(removeElement);
        }
        jsonArray.splice(jsonCounter + 1, jsonArray.length - jsonCounter);
        unhighlightall();
        savestate();
    })
    cymenu.on('click', '#ExportJson', function (evt) {
        var jsonfile = cy.json();
        var jsontxt = JSON.stringify(jsonfile)
        download('jsonFile.txt', jsontxt);
    })
    cymenu.on('click', '#ImportJson', function (evt) {
        var filetext = prompt("Please enter the text file:");
        var filejson = JSON.parse(filetext);
        cy.json(filejson);
        selectedArray = [];
        selectedEdge = [];
    })
   /* cymenu.on('click', '#Undo', function (evt) {
        if (jsonCounter > 0) {
            jsonCounter--;
            cy.json(jsonArray[jsonCounter]);
            unhighlightall();
        }
        console.log(jsonCounter);
        console.log(jsonArray[0]);
    })
    cymenu.on('click', '#Redo', function (evt) {
        jsonCounter++;
        cy.json(jsonArray[jsonCounter]);
        unhighlightall();
        console.log(cy.nodes().length);
        console.log(jsonArray[0]);
    })
    cymenu.on('click', '#ExportSpray', function (evt) {
        var node = evt.cyTarget;
        var spraytext = "";
        for (var i = 0; i < cy.nodes().length; i++)
            spraytext += "" + node.data('name') + "~" + node.data('type') + "~" + node.css('shape') + "~" + node.css('width') + "~" + node.css('border-color');
        download('spraytext.txt', spraytext)
    })
    cymenu.on('click', '#ImportJson', function (evt) {

    })*/





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
                    'line-color': 'red',
                    'width': 10,
                    'target-arrow-color': 'red'
                })
        .update();
    };
    function unhighlightEdge(edgeid) {
        cy.style()
        .selector('#' + edgeid)
          .css({
              'line-color': 'blue',
              'width': 6,
              'target-arrow-color': 'blue'
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


    // cy init


    //cy.$('#ladybug').remove();

    /*cy.on('tap', 'node', function(){
      var nodes = this;
      var tapped = nodes;
      var food = [];
      
      nodes.addClass('eater');
      
      for(;;){
        var connectedEdges = nodes.connectedEdges(function(){
          return !this.target().anySame( nodes );
        });
        
        var connectedNodes = connectedEdges.targets();
        
        Array.prototype.push.apply( food, connectedNodes );
        
        nodes = connectedNodes;
        
        if( nodes.empty() ){ break; }
      }
            
      var delay = 0;
      var duration = 500;
      for( var i = food.length - 1; i >= 0; i-- ){ (function(){
        var thisFood = food[i];
        var eater = thisFood.connectedEdges(function(){
          return this.target().same(thisFood);
        }).source();
                
        thisFood.delay( delay, function(){
          eater.addClass('eating');
        } ).animate({
          position: eater.position(),
          css: {
            'width': 10,
            'height': 10,
            'border-width': 0,
            'opacity': 0
          }
        }, {
          duration: duration,
          complete: function(){
            thisFood.remove();
          }
        });
        
        delay += duration;
      })(); } // for
      
    }); // on tap */
})// on dom ready

/*function sayhi() {
    $("sayhi").on("click", function () {
        console.log("HELLO WORLD");
    })
    console.log("SAYHI")
  }*/
function loadFileAsText() {
    var fileToLoad = document.getElementById("fileToLoad").files[0];

    var fileReader = new FileReader();
    fileReader.onload = function (fileLoadedEvent) {
        var textFromFileLoaded = fileLoadedEvent.target.result;
    };
    fileReader.readAsText(fileToLoad, "UTF-8");
}
