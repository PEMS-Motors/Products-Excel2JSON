document.getElementById('inputFiles').addEventListener('change', function() {
  let e = document.getElementById('inputFiles');
  let b = document.getElementById('startButton');

  if(e.files.length > 0) {
    b.disabled = false;
  } else {
    b.disabled = true;
  }
});

var XL2JSON = {

  products : {},

  Start : function() {

    XL2JSON.products = {};

    let e = document.getElementById('inputFiles');
    let lines = [];

    var fr = new FileReader();
    fr.onload=function() {
      let lines = fr.result.split('\n');
      XL2JSON.ParseLines(lines);
    }

    if(e.files.length > 0) {
      for(let i=0; i<e.files.length; i++) {
        fr.readAsText(e.files[i]);
      }
    }

  },

  //add a sheet to the products collection.
  ParseLines : function(lines) {

    if(lines.length > 1) {
      var headers = lines[0].split('\t');
      for(var i=1; i<lines.length; i++) {

        var line = lines[i].split('\t');

        let pemsnumber = '';

        if(headers.indexOf('Identification.PEMS Number') > -1
        && line.length > headers.indexOf('Identification.PEMS Number')) {

          var o = {
            'MetaData' : {
              'Path' : ''
            },
            'DevNotes' : {},
            'FacetedData' : {
              'Speeds' : '',
              'RPM' : '',
              'Enclosure' : '',
              'Frame' : '',
              'Material' : '',
              'Phase' : '',
              'Electrical Type' : '',
              'Voltage' : '',
              'HP' : ''
            },
            'TitlesAndDescriptions' : {
              'Title - Plain Text' : '',
              'Description - Plain Text' : '',
              'Title - PEMS Website' : '',
              'Description - PEMS Website' : ''
            },
            'Identification' : {
              'PEMS Number' : '',
              'Catalog Number' : '',
              'Model Number' : '',
              'UPC Number' : '',
              'Brand' : '',
              'Category' : '',
              'Class' : '',
              'Country of Origin' : '',
              'Units in Package' : ''
            },
            'Specifications' : {
              'Number of Inlets' : '',
              'Electrical Type' : '',
              'Capacitor' : '',
              'Capacitor Included' : '',
              'Phase' : '',
              'Frame' : '',
              'Diameter' : '',
              'HP' : '',
              'Watts' : '',
              'Kilowatts' : '',
              'CFM' : '',
              'Torque' : '',
              'Speeds' : '',
              'Enclosure' : '',
              'Current (amps)' : '',
              'Voltage' : '',
              'RPM' : '',
              'Rotation (SE)' : '',
              'Frequency (hz)' : '',
              'Bearings (DE/ODE)' : '',
              'C-Dim (in)' : '',
              'Overload Protection' : '',
              'Service Factor' : '',
              'Outlet Flange (in)' : '',
              'Outlet Shape' : '',
              'Material' : '',
              'Efficiency' : ''
            },
            'Dimensions' : {
              'Length (in)' : '',
              'Width (in)' : '',
              'Height (in)' : '',
              'Weight (lb)' : '',
              'C-Dim (in)' : ''
            },
            'CrossReference' : {
              'Brands' : '',
              'References' : '',
              'Replaces' : '',
              'Fits' : ''
            },
            'Applications' : '',
            'Features' : {},
            'Details' : '',
            'Certifications' : '',
            'Warnings' : ''
          };

          pemsnumberindex = headers.indexOf('Identification.PEMS Number');
          pemsnumber = line[pemsnumberindex];

          pemsnumber = pemsnumber.trim();

          for(var ii=0; ii<line.length; ii++) {
            let header = '';

            if(headers.length > ii) {
              header = headers[ii].split('.');
              let key = '';
              let subkey = '';
              let val = '';

              if(header.length > 0) {
                key = header[0];
              }

              if(line.length > ii) {
                val = line[ii];
              }

              if(header.length > 1) {
                subkey = header[1];
              }

              if(key.localeCompare('CrossReference')==0
              || key.localeCompare('MetaData')==0
              || key.localeCompare('DevNotes')==0
              || key.localeCompare('FacetedData')==0
              || key.localeCompare('TitlesAndDescriptions')==0
              || key.localeCompare('Identification')==0
              || key.localeCompare('Specifications')==0
              || key.localeCompare('Dimensions')==0
              || key.localeCompare('Features')==0
              ) {

                o[key][subkey] = val;
                if(XL2JSON.products.hasOwnProperty(pemsnumber)) {
                  if(XL2JSON.products[pemsnumber][key][subkey].trim().length > 0) {
                    o[key][subkey] = XL2JSON.products[pemsnumber][key][subkey].trim();
                  }
                }
              }

              if(key.localeCompare('Applications')==0
              || key.localeCompare('Details')==0
              || key.localeCompare('Certifications')==0
              || key.localeCompare('Warnings')==0
              ) {


                o[key] = val;
                if(XL2JSON.products.hasOwnProperty(pemsnumber)) {
                  if(XL2JSON.products[pemsnumber][key].trim().length > 0) {

                    o[key] = XL2JSON.products[pemsnumber][key].trim();
                  }
                }
              }
            }
          }

          temp_object = {
            headers : headers,
            values : line
          }


          if(pemsnumber.length > 0) {
            if(!XL2JSON.products.hasOwnProperty(pemsnumber)) {
              XL2JSON.products[pemsnumber] = {};
            }
            console.log(`Adding ${pemsnumber} to products`);
            console.log(o);
            XL2JSON.products[pemsnumber] = o;
          }

        }
      }
    }
    console.log(XL2JSON.products);
  },

  GenerateTitlesAndDescriptions : function() {

  }
};
