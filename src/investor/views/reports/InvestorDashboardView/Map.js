import React, { useState, useEffect, useCallback } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { Box, Card, CardContent, CardHeader, Divider } from "@mui/material";
import { scaleLinear } from "d3-scale";
import { API, graphqlOperation, Auth } from "aws-amplify";
import { onError } from "src/libs/errorLib.js";
import * as queries from "src/graphql/queries.js";
import countries from "src/components/FormLists/countries.js";

const countrylist = countries;
console.log(countrylist.length);

// url to a valid topojson file
const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const colorScale = scaleLinear()
  .domain([0.29, 0.68])
  .range(["#7bc3c9", "#086972"]);

const App = () => {
  const [sub, setSub] = useState("");
  const [request, setRequest] = useState([]);

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    try {
      let user = await Auth.currentAuthenticatedUser();
      const { attributes = {} } = user;
      const a = attributes["sub"];
      setSub(a);
    } catch (e) {
      if (e !== "No current user") {
        onError(e);
      }
    }
  }

  useEffect(() => {
    const getRequests = async () => {
      const {
        data: {
          listBuyers: { items: itemsPage1, nextToken },
        },
      } = await API.graphql(graphqlOperation(queries.listBuyers));
      const n = { data: { listBuyers: { items: itemsPage1, nextToken } } };
      const items = await n.data.listBuyers.items;
      setRequest(items);
    };
    getRequests();
  }, []);

  const handle = useCallback(() => {
    if (!request || !request.length) {
      return;
    } else {
      const d = request;
      return d;
    }
  }, [request]);

  function getcountries() {
    if (handle) {
      var x = request.filter((e) => e.buyer_status === "Approved");
      var z = x.filter((e) => e.investorId === sub);
      var fin = z.map((e) => e.buyer_country);
      return fin;
    } else {
      return;
    }
  }

  const items2 = [
    "United States of America",
    "United States of America",
    "Germany",
  ];

  function find_duplicate_in_array(array) {
    const count = {};
    const result = [];

    array.forEach((item) => {
      if (count[item]) {
        count[item] += 1;
        return;
      }
      count[item] = 1;
    });

    for (let prop in count) {
      if (count[prop] >= 1) {
        result.push(prop);
      }
    }
    console.log(count);

    var countriesadd = Object.values(count);
    console.log(countriesadd);
    var sumcountries = countriesadd.reduce((a, b) => a + b, 0);
    console.log(sumcountries);
    const countrykeys = Object.keys(count);
    console.log(countrykeys);

    const a = countriesadd.map((v) => v / sumcountries);

    var obj = {
      [countrykeys[0]]: a[0],
      [countrykeys[1]]: a[1],
    };
    console.log(obj);

    var i;
    for (i = 0; i < a.length; i++) {
      const initialValue = {};
      var newobj = {
        [countrykeys[i]]: a[i],
      };
    }

    return result;
  }

  console.log(find_duplicate_in_array(items2));

  return (
    <div>
      <Card>
        <CardHeader title="Exposure per Country" />
        <Divider />
        <CardContent>
          <Box position="relative">
            <ComposableMap>
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={colorScale(["0.68"])}
                    />
                  ))
                }
              </Geographies>
            </ComposableMap>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
};

export default App;
