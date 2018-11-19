conn = new Mongo();
db = conn.getDB("sube");
startTime = new Date();
var i;
var notZero = 0;
var cursor = db.localidades.find();
cursor.forEach(function( aRow ) {
    count = db.sube2dIndex.count(
        {
            "geometry.coordinates":
                {
                    $near: [ long, lat ],
                    $maxDistance: 0.01
                }
        }
    );

    db.localidades.update(
        { _id: aRow._id }, 
        { "$set": { "sube": count } }
    );
});

  endTime = new Date();
  var timeDiff = endTime - startTime;
  print("No son 0 -> " + notZero);
  print("Tiempo total: " + timeDiff);
