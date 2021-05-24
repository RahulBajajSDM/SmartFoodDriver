export const GetPolyline = (
  sourceLatitude,
  sourceLongitude,
  destinationLatitude,
  destinationLongitude,
) => {
  const polylineDecode = (t, e) => {
    for (
      var n,
        o,
        u = 0,
        l = 0,
        r = 0,
        d = [],
        h = 0,
        i = 0,
        a = null,
        c = Math.pow(10, e || 5);
      u < t.length;

    ) {
      (a = null), (h = 0), (i = 0);
      do (a = t.charCodeAt(u++) - 63), (i |= (31 & a) << h), (h += 5);
      while (a >= 32);
      (n = 1 & i ? ~(i >> 1) : i >> 1), (h = i = 0);
      do (a = t.charCodeAt(u++) - 63), (i |= (31 & a) << h), (h += 5);
      while (a >= 32);
      (o = 1 & i ? ~(i >> 1) : i >> 1),
        (l += n),
        (r += o),
        d.push([l / c, r / c]);
    }
    return (d = d.map((t) => {
      return {latitude: t[0], longitude: t[1]};
    }));
  };

  let url = `https://maps.googleapis.com/maps/api/directions/json?origin=${Number(
    sourceLatitude,
  )},${Number(sourceLongitude)}&destination=${Number(
    destinationLatitude,
  )},${Number(
    destinationLongitude,
  )}&mode=driving&key=AIzaSyAK_vkvxDH5vsqGkd0Qn-dDmq-rShTA7UA`;
  let urlResponse = fetch(url)
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.routes.length) {
        let polylineCoordinates = polylineDecode(
          responseJson.routes[0].overview_polyline.points,
        );

        return polylineCoordinates;
      }
    })
    .catch((e) => {});
  return urlResponse;
};

export default GetPolyline;
